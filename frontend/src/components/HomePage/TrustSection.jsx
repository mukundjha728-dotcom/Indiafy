import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Video, CreditCard, PackageCheck } from "lucide-react";

const trustFeatures = [
  {
    icon: <ShieldCheck size={24} />,
    iconBg: "bg-emerald-50",
    iconColor: "text-brand-accent",
    title: "Verified Sellers",
    description: "Every seller is identity-verified and quality-checked before onboarding.",
  },
  {
    icon: <Video size={24} />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Video Packing",
    description: "Sellers record packing videos for every order to prevent disputes.",
  },
  {
    icon: <CreditCard size={24} />,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Secure Payment",
    description: "Platform-managed payments with dynamic QR codes. No personal transfers.",
  },
  {
    icon: <PackageCheck size={24} />,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Verified Delivery",
    description: "Dedicated riders with real-time tracking for predictable, safe deliveries.",
  },
];

function TrustSection() {
  return (
    <section className="py-section-mobile md:py-16 bg-brand-background" id="trust" style={{ maxHeight: '500px' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading mb-2">Why Shop on Indiafy?</h2>
          <p className="text-brand-text-secondary text-sm sm:text-base font-medium max-w-lg mx-auto">
            Trust built into every transaction
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustFeatures.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-card p-5 sm:p-6 border border-brand-border shadow-card text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center mx-auto mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-brand-primary mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary font-medium leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
