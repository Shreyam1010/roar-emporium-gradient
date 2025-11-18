import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import AdminNav from "@/components/AdminNav";
import logo from "@/assets/roar-logo.png";

const Home = () => {
  const { data: featuredProducts = [] } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-premium">
      <AdminNav />
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
            <img src={logo} alt="ROAR Exim" className="w-full max-w-sm h-auto logo-enhanced" />
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Welcome to ROAR Exim
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              ROAR Exim Company delivers excellence in agricultural and commodity exports with uncompromising quality standards.
            </p>
            <Button asChild size="lg" className="rounded-lg bg-white text-primary hover:bg-gray-100">
              <Link to="/products">Explore Our Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Premium Products
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our carefully curated selection of high-quality agricultural products
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} id={product.id} name={product.name} image={product.image_url} inStock={product.in_stock} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="rounded-lg">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
