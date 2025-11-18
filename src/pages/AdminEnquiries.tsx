import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "@/components/AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminEnquiries = () => {
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

  const { data: enquiries, isLoading, refetch } = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('enquiries-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'enquiries'
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gradient-premium">
      <AdminHeader title="Enquiry Management" currentPage="enquiries" />

      <div className="container mx-auto px-6 py-12">

        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading enquiries...</p>
        ) : enquiries && enquiries.length > 0 ? (
          <div className="bg-card rounded-xl shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell>
                      {new Date(enquiry.created_at!).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{enquiry.user_name}</TableCell>
                    <TableCell>{enquiry.user_email}</TableCell>
                    <TableCell>{enquiry.product_name}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">{enquiry.message}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No enquiries yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
