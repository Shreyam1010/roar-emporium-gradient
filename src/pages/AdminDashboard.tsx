import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MessageSquare, TrendingUp, ShoppingCart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import AdminHeader from "@/components/AdminHeader";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const { data: productsCount } = useQuery({
    queryKey: ["products-count"],
    queryFn: async () => {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: enquiriesCount } = useQuery({
    queryKey: ["enquiries-count"],
    queryFn: async () => {
      const { count } = await supabase.from("enquiries").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: recentEnquiries } = useQuery({
    queryKey: ["recent-enquiries-chart"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("created_at, product_name")
        .order("created_at", { ascending: false })
        .limit(30);
      
      if (error) throw error;

      // Group by date
      const grouped = data.reduce((acc: any, curr) => {
        const date = new Date(curr.created_at!).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(grouped).map(([date, count]) => ({
        date,
        enquiries: count
      })).slice(0, 7).reverse();
    },
  });

  const { data: topProducts } = useQuery({
    queryKey: ["top-products-chart"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("product_name")
        .limit(100);
      
      if (error) throw error;

      // Count by product
      const grouped = data.reduce((acc: any, curr) => {
        acc[curr.product_name] = (acc[curr.product_name] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(grouped)
        .map(([name, count]) => ({ name, enquiries: count }))
        .sort((a: any, b: any) => b.enquiries - a.enquiries)
        .slice(0, 5);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-premium">
      <AdminHeader title="Admin Dashboard" currentPage="dashboard" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{productsCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Total Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">{enquiriesCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Enquiries Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={recentEnquiries || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="enquiries" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Top Products by Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProducts || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enquiries" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
