import { motion } from "framer-motion";
import { ShieldCheck, Bike, MessageSquareText } from "lucide-react";

function TrustSection() {
  const features = [
    {
      icon: <ShieldCheck size={26} strokeWidth={1.8} />,
      title: "Manually Sector Verified",
      description:
        "Each store is reviewed and verified by our local sector team before onboarding to maintain quality and trust.",
    },
    {
      icon: <Bike size={26} strokeWidth={1.8} />,
      title: "Dedicated Local Riders",
      description:
        "Delivery partners are aligned to specific neighborhoods, enabling smoother routing and dependable service.",
    },
    {
      icon: <MessageSquareText size={26} strokeWidth={1.8} />,
      title: "Direct Seller Communication",
      description:
        "Customers can connect with sellers or assigned managers for faster clarification and reliable order support.",
    },
  ];

  return (
    <section className="pt-16 pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Built for Structured Hyperlocal Commerce
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl md:max-w-xl">
            Indiafy combines verification, localized delivery, and transparent
            communication to create a more reliable commerce experience across
            West Gurugram.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm transition duration-300 group-hover:shadow-xl group-hover:-translate-y-2 h-full flex flex-col">
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-6 transition group-hover:bg-blue-600 group-hover:text-white">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-4 leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
