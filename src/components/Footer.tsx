import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "@/assets/roar-logo.png";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
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
    <footer className="bg-primary text-primary-foreground py-12 mt-20 border-t border-accent/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="ROAR Exim" className="h-16 mb-4 brightness-110" />
            <p className="text-primary-foreground/80 text-center md:text-left font-sans">
              Your trusted partner in global export excellence
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 font-sans">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 font-sans">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 font-sans">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 font-sans">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-primary-foreground/80 font-sans">
              <li>Email: info@roarexim.com</li>
              <li>Phone: +1 234 567 8900</li>
            </ul>
          </div>
        </div>
        
        {/* Social Media Section */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <h3 className="text-xl font-display font-semibold text-center mb-6">Follow Us</h3>
          <div className="flex justify-center gap-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-accent hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={28} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-accent hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={28} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-accent hover:scale-110 transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook size={28} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-accent hover:scale-110 transition-all duration-300"
              aria-label="Twitter"
            >
              <Twitter size={28} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/80 font-sans">
          <p>&copy; 2025 ROAR Exim Company. All rights reserved.</p>
          {!isLoading && (
            <div className="mt-4">
              {isAdmin ? (
                <Link 
                  to="/admin/dashboard" 
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 underline"
                >
                  Admin Panel
                </Link>
              ) : (
                <Link 
                  to="/admin/login" 
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 underline"
                >
                  Admin Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
