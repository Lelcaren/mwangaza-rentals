
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Building, Users, CreditCard, BarChart3, Bell, Settings, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "@/components/Dashboard";
import PropertyManagement from "@/components/PropertyManagement";
import TenantManagement from "@/components/TenantManagement";
import BillingSystem from "@/components/BillingSystem";
import Reports from "@/components/Reports";
import Notifications from "@/components/Notifications";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "properties", label: "Properties", icon: Building },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "notifications", label: "Notices", icon: Bell },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg shadow-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PropertyPro</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Kenya</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Welcome,</span>
                <span className="font-medium text-foreground">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Settings className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <LogOut className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Button>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-semibold">
                  {user?.user_metadata?.full_name ? 
                    user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 
                    user?.email?.[0]?.toUpperCase() || 'U'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Enhanced Navigation Tabs */}
          <div className="relative">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:w-auto lg:inline-flex bg-muted/30 backdrop-blur-sm border border-border/50 p-1 rounded-2xl shadow-lg">
              {navItems.map((item) => (
                <TabsTrigger 
                  key={item.id} 
                  value={item.id} 
                  className="flex items-center justify-center space-x-2 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300 px-3 py-2.5"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm font-medium">{item.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content with animations */}
          <div className="relative">
            <TabsContent value="dashboard" className="mt-6 animate-fade-in">
              <Dashboard />
            </TabsContent>
            
            <TabsContent value="properties" className="mt-6 animate-fade-in">
              <PropertyManagement />
            </TabsContent>
            
            <TabsContent value="tenants" className="mt-6 animate-fade-in">
              <TenantManagement />
            </TabsContent>
            
            <TabsContent value="billing" className="mt-6 animate-fade-in">
              <BillingSystem />
            </TabsContent>
            
            <TabsContent value="reports" className="mt-6 animate-fade-in">
              <Reports />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6 animate-fade-in">
              <Notifications />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
