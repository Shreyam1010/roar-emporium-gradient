import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import AdminNav from "@/components/AdminNav";
import logo from "@/assets/roar-logo.png";
import fernLeaves from "@/assets/sticker-fern-leaves.png";
import curryLeaves from "@/assets/sticker-curry-leaves.png";
import corianderLeaves from "@/assets/sticker-coriander-leaves.png";
import bayLeaves from "@/assets/sticker-bay-leaves.png";
import gingerRoot from "@/assets/sticker-ginger-root.png";
import cinnamonSticks from "@/assets/sticker-cinnamon-sticks.png";
import chiliPeppers from "@/assets/sticker-chili-peppers.png";

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
    <div className="min-h-screen bg-gradient-warm texture-overlay">
      <AdminNav />
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,184,28,0.08),transparent_70%)]"></div>
        
        {/* Decorative Botanical Stickers */}
        <img 
          src={fernLeaves} 
          alt="" 
          className="absolute top-10 left-10 w-32 lg:w-48 opacity-20 animate-[float_6s_ease-in-out_infinite]" 
          style={{ animationDelay: '0s' }}
        />
        <img 
          src={curryLeaves} 
          alt="" 
          className="absolute top-20 right-10 w-24 lg:w-36 opacity-15 animate-[float_8s_ease-in-out_infinite]" 
          style={{ animationDelay: '1s' }}
        />
        <img 
          src={corianderLeaves} 
          alt="" 
          className="absolute bottom-20 left-20 w-28 lg:w-40 opacity-20 animate-[float_7s_ease-in-out_infinite]" 
          style={{ animationDelay: '2s' }}
        />
        <img 
          src={cinnamonSticks} 
          alt="" 
          className="absolute bottom-10 right-20 w-20 lg:w-32 opacity-15 animate-[float_9s_ease-in-out_infinite]" 
          style={{ animationDelay: '1.5s' }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto animate-fade-up">
            <img src={logo} alt="ROAR Exim" className="w-full max-w-sm h-auto logo-enhanced" />
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              Welcome to ROAR Exim
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl font-sans">
              ROAR Exim Company delivers excellence in agricultural and commodity exports with uncompromising quality standards.
            </p>
            <Button asChild size="lg" className="rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link to="/products">Explore Our Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative Botanical Stickers */}
        <img 
          src={bayLeaves} 
          alt="" 
          className="absolute top-10 right-10 w-28 lg:w-40 opacity-10 animate-[float_7s_ease-in-out_infinite]" 
          style={{ animationDelay: '0.5s' }}
        />
        <img 
          src={gingerRoot} 
          alt="" 
          className="absolute bottom-20 left-10 w-24 lg:w-36 opacity-15 animate-[float_8s_ease-in-out_infinite]" 
          style={{ animationDelay: '2s' }}
        />
        <img 
          src={chiliPeppers} 
          alt="" 
          className="absolute bottom-10 right-1/4 w-20 lg:w-32 opacity-10 animate-[float_6s_ease-in-out_infinite]" 
          style={{ animationDelay: '1s' }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Our Premium Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
              Discover our carefully curated selection of high-quality agricultural products
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard id={product.id} name={product.name} image={product.image_url} inStock={product.in_stock} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="rounded-2xl border-2 border-accent text-foreground hover:bg-accent/10 hover:border-accent/80 transition-all duration-300 hover:scale-105">
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
