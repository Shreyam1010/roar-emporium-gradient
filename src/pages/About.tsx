import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminNav from "@/components/AdminNav";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-premium">
      <AdminNav />
      <Navbar />
      
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About ROAR Exim
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Building bridges between quality producers and global markets since 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card className="p-8 lg:p-12 mb-12 rounded-xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
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
            <Card className="p-6 text-center rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Products</div>
            </Card>
            <Card className="p-6 text-center rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </Card>
            <Card className="p-6 text-center rounded-xl hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
