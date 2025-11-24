import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import AdminNav from "@/components/AdminNav";

const Products = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-warm texture-overlay">
      <AdminNav />
      <Navbar />
      
      {/* Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,184,28,0.08),transparent_70%)]"></div>
        <div className="container mx-auto px-6 text-center relative z-10 animate-fade-up">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Premium quality agricultural products sourced from the finest regions
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="text-center text-foreground font-sans">Loading products...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ProductCard id={product.id} name={product.name} image={product.image_url} inStock={product.in_stock} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
