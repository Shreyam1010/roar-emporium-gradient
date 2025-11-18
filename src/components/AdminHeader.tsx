import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Home, LogOut } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  currentPage: "dashboard" | "products" | "enquiries";
}

const AdminHeader = ({ title, currentPage }: AdminHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleToggleToUserSide = () => {
    navigate("/");
  };

  return (
    <div className="py-6 shadow-lg border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <div className="flex gap-3">
            <Button 
              onClick={handleToggleToUserSide} 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 gap-2"
            >
              <Home className="h-4 w-4" />
              User Side
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        
        <nav className="flex gap-4">
          <Button 
            asChild 
            variant={currentPage === "dashboard" ? "secondary" : "ghost"}
            className={currentPage === "dashboard" ? "" : "text-white hover:bg-white/10"}
          >
            <Link to="/admin/dashboard">Dashboard</Link>
          </Button>
          <Button 
            asChild 
            variant={currentPage === "products" ? "secondary" : "ghost"}
            className={currentPage === "products" ? "" : "text-white hover:bg-white/10"}
          >
            <Link to="/admin/products">Products</Link>
          </Button>
          <Button 
            asChild 
            variant={currentPage === "enquiries" ? "secondary" : "ghost"}
            className={currentPage === "enquiries" ? "" : "text-white hover:bg-white/10"}
          >
            <Link to="/admin/enquiries">Enquiries</Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default AdminHeader;
