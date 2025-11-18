import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminNav from "@/components/AdminNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-premium">
      <AdminNav />
      <Navbar />
      
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team for inquiries and support
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input placeholder="Your name" className="rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" className="rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <Input placeholder="What is this regarding?" className="rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea placeholder="Your message..." rows={5} className="rounded-lg" />
                </div>
                <Button className="w-full rounded-lg" size="lg">Send Message</Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-4">Email</h3>
                <p className="text-muted-foreground">info@roarexim.com</p>
                <p className="text-muted-foreground">sales@roarexim.com</p>
              </Card>

              <Card className="p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-4">Phone</h3>
                <p className="text-muted-foreground">+1 234 567 8900</p>
                <p className="text-muted-foreground">+1 234 567 8901</p>
              </Card>

              <Card className="p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-4">Office</h3>
                <p className="text-muted-foreground">
                  Export Hub<br />
                  Business District<br />
                  International Trade Center<br />
                  Suite 500
                </p>
              </Card>

              <Card className="p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-4">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
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
