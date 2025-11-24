import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminNav from "@/components/AdminNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-warm texture-overlay">
      <AdminNav />
      <Navbar />
      
      {/* Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,184,28,0.08),transparent_70%)]"></div>
        <div className="container mx-auto px-6 text-center relative z-10 animate-fade-up">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Get in touch with our team for inquiries and support
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 rounded-2xl hover-lift shadow-xl border border-accent/10 bg-white/95 backdrop-blur-sm animate-fade-up">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Name</label>
                  <Input placeholder="Your name" className="rounded-xl border-accent/20 focus:border-accent transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" className="rounded-xl border-accent/20 focus:border-accent transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Subject</label>
                  <Input placeholder="What is this regarding?" className="rounded-xl border-accent/20 focus:border-accent transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-foreground mb-2">Message</label>
                  <Textarea placeholder="Your message..." rows={5} className="rounded-xl border-accent/20 focus:border-accent transition-all duration-300" />
                </div>
                <Button className="w-full rounded-xl bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-lg" size="lg">Send Message</Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6 rounded-2xl hover-lift shadow-lg border border-accent/10 bg-white/95 backdrop-blur-sm transition-all duration-500 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">Email</h3>
                <p className="text-muted-foreground font-sans">info@roarexim.com</p>
                <p className="text-muted-foreground font-sans">sales@roarexim.com</p>
              </Card>

              <Card className="p-6 rounded-2xl hover-lift shadow-lg border border-accent/10 bg-white/95 backdrop-blur-sm transition-all duration-500 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">Phone</h3>
                <p className="text-muted-foreground font-sans">+1 234 567 8900</p>
                <p className="text-muted-foreground font-sans">+1 234 567 8901</p>
              </Card>

              <Card className="p-6 rounded-2xl hover-lift shadow-lg border border-accent/10 bg-white/95 backdrop-blur-sm transition-all duration-500 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">Office</h3>
                <p className="text-muted-foreground font-sans">
                  Export Hub<br />
                  Business District<br />
                  International Trade Center<br />
                  Suite 500
                </p>
              </Card>

              <Card className="p-6 rounded-2xl hover-lift shadow-lg border border-accent/10 bg-white/95 backdrop-blur-sm transition-all duration-500 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4">Business Hours</h3>
                <p className="text-muted-foreground font-sans">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground font-sans">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-muted-foreground font-sans">Sunday: Closed</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
