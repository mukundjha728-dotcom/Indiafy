import { Facebook, Instagram, Twitter, Linkedin, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        {/* Main Grid */}
        <div className="grid md:grid-cols-12 gap-12">
          {/* Brand Block */}
          <div className="md:col-span-4">
            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Indiafy
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-sm max-w-sm">
              Indiafy connects verified neighborhood stores across West Gurugram
              through a structured sector-based commerce model built on trust,
              speed, and accountability.
            </p>

            <div className="flex items-center gap-2 mt-5 text-gray-500 text-sm">
              <MapPin size={16} />
              West Gurugram, Haryana
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-7">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition cursor-pointer shadow-sm"
                >
                  <Icon size={16} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Spacer Column for Visual Breathing */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-5 text-sm uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="hover:text-blue-600 transition cursor-pointer">
                About Indiafy
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                How It Works
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Careers
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* Customers */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-5 text-sm uppercase tracking-wide">
              Customers
            </h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="hover:text-blue-600 transition cursor-pointer">
                Browse Stores
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Categories
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Support
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Order Tracking
              </li>
            </ul>
          </div>

          {/* Sellers */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-gray-900 mb-5 text-sm uppercase tracking-wide">
              Sellers
            </h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="hover:text-blue-600 transition cursor-pointer">
                Become a Seller
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Seller Dashboard
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Sector Onboarding
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Partner Support
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Indiafy Commerce Pvt. Ltd.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-blue-600 transition cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-blue-600 transition cursor-pointer">
              Terms & Conditions
            </span>
            <span className="hover:text-blue-600 transition cursor-pointer">
              Refund Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
