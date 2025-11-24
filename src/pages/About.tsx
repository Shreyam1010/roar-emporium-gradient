import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminNav from "@/components/AdminNav";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-warm texture-overlay">
      <AdminNav />
      <Navbar />
      
      {/* Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,184,28,0.08),transparent_70%)]"></div>
        <div className="container mx-auto px-6 text-center relative z-10 animate-fade-up">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            About ROAR Exim
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Building bridges between quality producers and global markets since 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card className="p-8 lg:p-12 mb-12 rounded-2xl hover-lift shadow-xl border border-accent/10 bg-white/95 backdrop-blur-sm animate-fade-up">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed font-sans">
              <p>
                ROAR Exim Company was founded with a vision to connect the world's finest agricultural products with discerning customers globally. Since our establishment in 2025, we have been committed to excellence in every aspect of our operations.
              </p>
              <p>
                Our name, ROAR, represents our bold commitment to quality and our powerful presence in the international export market. We source premium products directly from trusted farmers and producers, ensuring authenticity and superior quality in every shipment.
              </p>
              <p>
                With a focus on agricultural commodities, spices, and specialty products, we serve clients across continents, maintaining the highest standards of quality control and customer satisfaction.
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center rounded-2xl hover-lift shadow-lg border border-accent/10 bg-white/95 backdrop-blur-sm transition-all duration-500 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-display font-bold text-accent mb-2">100+</div>
              <div className="text-muted-foreground font-sans">Products</div>
            </Card>
            <Card className="p-6 text-center rounded-2xl hover-lift shadow-lg border border-accent/10 bg-white/95 backdrop-blur-sm transition-all duration-500 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-display font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground font-sans">Countries Served</div>
            </Card>
            <Card className="p-6 text-center rounded-2xl hover-lift shadow-lg border border-accent/10 bg-white/95 backdrop-blur-sm transition-all duration-500 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-display font-bold text-accent mb-2">24/7</div>
              <div className="text-muted-foreground font-sans">Customer Support</div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
