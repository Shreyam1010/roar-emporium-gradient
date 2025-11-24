import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminNav from "@/components/AdminNav";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EnquiryForm from "@/components/EnquiryForm";
import { getProductImage } from "@/lib/productImages";

const ProductDetail = () => {
  const { id } = useParams();
  const [showEnquiry, setShowEnquiry] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-premium">
        <AdminNav />
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-premium">
        <AdminNav />
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm texture-overlay">
      <AdminNav />
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <Button asChild variant="ghost" className="mb-6 hover:bg-accent/10 transition-all duration-300">
          <Link to="/products" className="font-sans">← Back to Products</Link>
        </Button>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Product Image */}
          <div className="flex justify-center animate-fade-up">
            <img
              src={getProductImage(product.image_url)}
              alt={product.name}
              className="w-full max-w-2xl h-auto rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Product Info */}
          <div className="text-center space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground">
              {product.name}
            </h1>
            
            {product.description && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-sans">
                {product.description}
              </p>
            )}
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-accent/10 hover-lift animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-card-foreground font-sans">
                    <span className="text-accent mt-1 text-xl">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-accent/10 hover-lift animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Specifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-border pb-2">
                    <span className="font-sans font-medium text-card-foreground capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="text-muted-foreground font-sans">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enquire Now Button */}
          <div className="flex justify-center pt-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              onClick={() => setShowEnquiry(true)}
              className="w-full max-w-md rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Enquire Now
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Enquiry Form Dialog */}
      <EnquiryForm
        open={showEnquiry}
        onOpenChange={setShowEnquiry}
        productId={product.id}
        productName={product.name}
      />
    </div>
  );
};

export default ProductDetail;
