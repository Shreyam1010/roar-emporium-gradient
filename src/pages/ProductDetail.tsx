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
    <div className="min-h-screen bg-gradient-premium">
      <AdminNav />
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/products">← Back to Products</Link>
        </Button>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={getProductImage(product.image_url)}
              alt={product.name}
              className="w-full max-w-2xl h-auto rounded-xl shadow-2xl object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              {product.name}
            </h1>
            
            {product.description && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
                    <span className="text-muted-foreground">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enquire Now Button */}
          <div className="flex justify-center pt-8">
            <Button
              size="lg"
              onClick={() => setShowEnquiry(true)}
              className="w-full max-w-md rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
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
