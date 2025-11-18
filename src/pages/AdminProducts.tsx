import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/AdminHeader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

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

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product deleted successfully" });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: "Failed to delete product", variant: "destructive" });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (formData: any) => {
      if (editProduct) {
        const { error } = await supabase
          .from("products")
          .update(formData)
          .eq("id", editProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert([formData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: editProduct ? "Product updated successfully" : "Product added successfully" });
      setShowForm(false);
      setEditProduct(null);
    },
    onError: () => {
      toast({ title: "Failed to save product", variant: "destructive" });
    },
  });

  const toggleStockMutation = useMutation({
    mutationFn: async ({ id, inStock }: { id: string; inStock: boolean }) => {
      const { error } = await supabase
        .from("products")
        .update({ in_stock: inStock })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Stock status updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update stock status", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const features = formData.get("features")?.toString().split("\n").filter(f => f.trim());
    const specs = formData.get("specifications")?.toString();
    
    saveMutation.mutate({
      name: formData.get("name"),
      image_url: formData.get("image_url"),
      description: formData.get("description"),
      features: features,
      specifications: specs ? JSON.parse(specs) : {}
    });
  };

  return (
    <div className="min-h-screen bg-gradient-premium">
      <AdminHeader title="Product Management" currentPage="products" />

      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Product Management
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Manage your product catalog
              </p>
            </div>
            <Button onClick={() => { setEditProduct(null); setShowForm(true); }} className="gap-2 ml-4">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="text-center text-white">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-white">
              <p className="text-xl mb-4">No products yet</p>
              <Button onClick={() => { setEditProduct(null); setShowForm(true); }}>
                Add Your First Product
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="relative group">
                  <div onClick={() => navigate(`/admin/product/${product.id}`)}>
                    <ProductCard id={product.id} name={product.name} image={product.image_url} inStock={product.in_stock} />
                  </div>
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant={product.in_stock ? "default" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStockMutation.mutate({ id: product.id, inStock: !product.in_stock });
                      }}
                      className="gap-1"
                    >
                      <Package className="h-4 w-4" />
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditProduct(product);
                        setShowForm(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(product.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && deleteMutation.mutate(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" defaultValue={editProduct?.name} required />
            </div>
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input id="image_url" name="image_url" defaultValue={editProduct?.image_url} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={editProduct?.description} />
            </div>
            <div>
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea 
                id="features" 
                name="features" 
                defaultValue={editProduct?.features?.join("\n")}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>
            <div>
              <Label htmlFor="specifications">Specifications (JSON format)</Label>
              <Textarea 
                id="specifications" 
                name="specifications" 
                defaultValue={editProduct?.specifications ? JSON.stringify(editProduct.specifications, null, 2) : '{"origin": "India", "grade": "Premium"}'}
                placeholder='{"origin": "India", "grade": "Premium"}'
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save Product"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
