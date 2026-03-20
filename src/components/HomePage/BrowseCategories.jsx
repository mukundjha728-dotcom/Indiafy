
import {
  ShoppingBag,
  ShoppingBasket,
  Pill,
  Tv,
  Lamp,
  Scissors,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // 1. Import Link from React Router

function BrowseCategories() {
  // 2. Added 'slug' to each category to create a unique URL path
  const categories = [
    {
      name: "Garments",
      slug: "garments",
      stores: "12 Stores",
      icon: <ShoppingBag size={26} />,
      gradient: "from-blue-500 to-blue-400",
    },
    {
      name: "Grocery",
      slug: "grocery",
      stores: "45 Stores",
      icon: <ShoppingBasket size={26} />,
      gradient: "from-green-500 to-green-400",
    },
    {
      name: "Pharmacy",
      slug: "pharmacy",
      stores: "8 Stores",
      icon: <Pill size={26} />,
      gradient: "from-red-500 to-red-400",
    },
    {
      name: "Electronics",
      slug: "electronics",
      stores: "15 Stores",
      icon: <Tv size={26} />,
      gradient: "from-purple-500 to-purple-400",
    },
    {
      name: "Home Decor",
      slug: "home-decor",
      stores: "22 Stores",
      icon: <Lamp size={26} />,
      gradient: "from-orange-500 to-orange-400",
    },
    {
      name: "Personal Care",
      slug: "personal-care",
      stores: "31 Stores",
      icon: <Scissors size={26} />,
      gradient: "from-pink-500 to-pink-400",
    },
  ];

  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-b from-white to-gray-50">
      {/* subtle divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-14"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Browse Categories
            </h2>
            <p className="text-gray-500 mt-3 text-lg">
              Everything available across West Gurugram
            </p>
          </div>

          {/* 3. Link the View All button */}
          <Link 
            to="/browse-categories" 
            className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            View All
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl text-center border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* 4. Wrap card content in a Link */}
              <Link to={`/category/${category.slug}`} className="block w-full h-full p-8 cursor-pointer">
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-50 to-transparent pointer-events-none"></div>

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br ${category.gradient} text-white shadow-md transition group-hover:scale-110`}
                >
                  {category.icon}
                </div>

                <h3 className="relative text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>

                <p className="relative text-sm text-gray-500 mt-2">
                  {category.stores}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Scroll */}
        <div className="md:hidden flex gap-5 overflow-x-auto pb-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="min-w-[170px] bg-white rounded-2xl text-center shadow-sm border border-gray-100"
            >
              {/* 5. Wrap mobile card content in a Link */}
              <Link to={`/category/${category.slug}`} className="block w-full h-full p-6">
                <div
                  className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br ${category.gradient} text-white`}
                >
                  {category.icon}
                </div>

                <h3 className="font-semibold text-gray-900">{category.name}</h3>

                <p className="text-sm text-gray-500 mt-1">{category.stores}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrowseCategories;