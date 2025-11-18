import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const AdminProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const { data: product, isLoading } = useQuery({
    queryKey: ["admin-product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const toggleStockMutation = useMutation({
    mutationFn: async (inStock: boolean) => {
      const { error } = await supabase
        .from("products")
        .update({ in_stock: inStock })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-product", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Stock status updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update stock status", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-premium">
        <AdminHeader title="Product Details" currentPage="products" />
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-premium">
        <AdminHeader title="Product Details" currentPage="products" />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/admin/products")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-premium">
      <AdminHeader title="Product Details" currentPage="products" />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => navigate("/admin/products")} variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
          <Button
            onClick={() => toggleStockMutation.mutate(!product.in_stock)}
            variant={product.in_stock ? "default" : "outline"}
            className="gap-2"
            disabled={toggleStockMutation.isPending}
          >
            <Package className="h-4 w-4" />
            {product.in_stock ? "Mark Out of Stock" : "Mark In Stock"}
          </Button>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Product Image */}
          <div className="flex justify-center relative">
            <img
              src={product.image_url}
              alt={product.name}
              className={`w-full max-w-2xl h-auto rounded-xl shadow-2xl object-cover ${!product.in_stock ? 'grayscale opacity-60' : ''}`}
            />
            {!product.in_stock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Badge variant="destructive" className="text-2xl px-8 py-3">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-card rounded-xl p-8 shadow-lg space-y-6">
            <div className="flex items-start justify-between">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                {product.name}
              </h1>
              <Badge variant={product.in_stock ? "default" : "destructive"}>
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            
            {product.description && (
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            )}
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-card-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-4">Specifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium text-card-foreground capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetail;
