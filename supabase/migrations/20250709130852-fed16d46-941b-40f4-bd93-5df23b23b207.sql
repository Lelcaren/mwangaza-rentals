
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'tenant' CHECK (role IN ('admin', 'landlord', 'tenant')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  property_type TEXT DEFAULT 'apartment' CHECK (property_type IN ('apartment', 'house', 'commercial', 'studio')),
  total_units INTEGER DEFAULT 1,
  description TEXT,
  monthly_rent DECIMAL(10,2),
  deposit_amount DECIMAL(10,2),
  amenities TEXT[],
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'maintenance')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create tenants table
CREATE TABLE public.tenants (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  national_id TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  lease_start DATE,
  lease_end DATE,
  monthly_rent DECIMAL(10,2) NOT NULL,
  deposit_paid DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create billing table
CREATE TABLE public.billing (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  bill_type TEXT NOT NULL CHECK (bill_type IN ('rent', 'utilities', 'maintenance', 'deposit', 'penalty')),
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  billing_id UUID REFERENCES public.billing(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT DEFAULT 'mpesa' CHECK (payment_method IN ('mpesa', 'bank', 'cash', 'card')),
  transaction_id TEXT,
  mpesa_receipt TEXT,
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for properties
CREATE POLICY "Property owners can manage their properties" ON public.properties
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Tenants can view their rented properties" ON public.properties
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tenants 
      WHERE tenants.property_id = properties.id 
      AND tenants.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all properties" ON public.properties
  FOR SELECT USING (public.get_user_role() = 'admin');

-- RLS Policies for tenants
CREATE POLICY "Property owners can manage tenants" ON public.tenants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = tenants.property_id 
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Tenants can view their own record" ON public.tenants
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all tenants" ON public.tenants
  FOR ALL USING (public.get_user_role() = 'admin');

-- RLS Policies for billing
CREATE POLICY "Property owners can manage billing" ON public.billing
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = billing.property_id 
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Tenants can view their bills" ON public.billing
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tenants 
      WHERE tenants.id = billing.tenant_id 
      AND tenants.user_id = auth.uid()
    )
  );

-- RLS Policies for payments
CREATE POLICY "Property owners can view payments" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tenants t
      JOIN public.properties p ON t.property_id = p.id
      WHERE t.id = payments.tenant_id 
      AND p.owner_id = auth.uid()
    )
  );

CREATE POLICY "Tenants can view and create their payments" ON public.payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.tenants 
      WHERE tenants.id = payments.tenant_id 
      AND tenants.user_id = auth.uid()
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Users can manage their notifications" ON public.notifications
  FOR ALL USING (auth.uid() = user_id);

-- Create trigger function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.billing
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
