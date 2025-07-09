
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Building } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg inline-block animate-pulse">
            <Building className="h-12 w-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">PropertyPro</h2>
            <p className="text-muted-foreground">Loading your account...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
