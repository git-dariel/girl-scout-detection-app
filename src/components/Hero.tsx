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
    <div className="mt-24 sm:mt-32">
      <motion.div
        className="lg:grid lg:grid-cols-12 lg:gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="lg:col-span-7">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
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
            className="text-lg text-gray-400 max-w-3xl leading-relaxed mb-12"
            variants={itemVariants}
          >
            Leverage advanced AI technology to instantly verify the authenticity of Girl Scout
            uniforms. Our cutting-edge system provides accurate detection and detailed analysis to
            ensure uniform integrity.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/home"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 
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

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#features"
                onClick={(e) => handleSmoothScroll(e, "features")}
                className="inline-flex items-center justify-center px-8 py-4 border border-white/10 
                  text-white rounded-xl font-medium transition-all duration-300 ease-in-out 
                  hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/10 focus:ring-offset-2"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="hidden lg:block lg:col-span-5" variants={itemVariants}>
          {/* Add hero image or illustration here */}
          <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_50%)]" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
