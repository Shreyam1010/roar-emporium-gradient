import logo from "@/assets/roar-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-premium text-white py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="ROAR Exim Company" className="h-16 w-auto mb-4" />
            <p className="text-gray-300 text-sm text-center md:text-left">
              Premium quality exports since 2025
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Email: info@roarexim.com</li>
              <li>Phone: +1 234 567 8900</li>
              <li>Address: Export Hub, Business District</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 ROAR Exim Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
