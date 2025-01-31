import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="mt-16 sm:mt-24 lg:mt-32 mb-6 sm:mb-10">
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8"
          variants={itemVariants}
        >
          <motion.span
            className="block bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Smart Scout
          </motion.span>
          <motion.span
            className="block text-white/90 mt-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Authentication AI
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 sm:mb-12 mx-auto max-w-2xl"
          variants={itemVariants}
        >
          Leverage advanced AI technology to instantly verify the authenticity of Girl Scout
          uniforms. Our cutting-edge system provides accurate detection and detailed analysis to
          ensure uniform integrity.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/home"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 
                text-white rounded-xl font-medium transition-all duration-300 ease-in-out transform hover:shadow-lg 
                hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 group"
            >
              <span>Get Started</span>
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-white/10 
                text-white rounded-xl font-medium transition-all duration-300 ease-in-out 
                hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/10 focus:ring-offset-2"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
