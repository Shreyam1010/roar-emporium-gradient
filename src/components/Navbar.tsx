import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "@/assets/roar-logo.png";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <nav className="bg-gradient-premium sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-8">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="ROAR Exim Company" className="h-12 w-auto logo-enhanced" />
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-gray-300 transition-colors duration-300 font-medium"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 transition-colors duration-300 font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 transition-colors duration-300 font-medium"
            >
              Contact Us
            </Link>
            {!isLoading && (
              <Link
                to={isAdmin ? "/admin/dashboard" : "/admin/login"}
                className="text-white hover:text-gray-300 transition-colors duration-300 font-medium"
              >
                {isAdmin ? "Admin Side" : "Admin"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
