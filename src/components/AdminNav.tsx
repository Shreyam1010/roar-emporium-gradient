import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminNav = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    checkAdminStatus();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      setIsAdmin(!!roleData);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  if (isLoading || !isAdmin) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {isAdminRoute ? (
        <Button asChild variant="secondary" size="sm">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            User Side
          </Link>
        </Button>
      ) : (
        <Button asChild variant="secondary" size="sm">
          <Link to="/admin/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Panel
          </Link>
        </Button>
      )}
      <Button onClick={handleLogout} variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};

export default AdminNav;
