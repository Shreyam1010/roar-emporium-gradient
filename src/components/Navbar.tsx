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
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-accent/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-8">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="ROAR Exim Company" className="h-12 w-auto logo-enhanced" />
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-accent transition-all duration-300 font-sans font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all after:duration-300"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-foreground hover:text-accent transition-all duration-300 font-sans font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all after:duration-300"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-accent transition-all duration-300 font-sans font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all after:duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-accent transition-all duration-300 font-sans font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-accent after:transition-all after:duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
