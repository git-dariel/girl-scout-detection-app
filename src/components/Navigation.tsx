import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import girlScoutLogo from "../assets/girl-scout-logo.avif";

interface NavigationProps {
  showLaunchButton?: boolean;
}

export const Navigation = ({ showLaunchButton = true }: NavigationProps) => {
  return (
    <motion.nav
      className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={girlScoutLogo}
              alt="Smart Scout Logo"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </motion.div>
        </Link>
        {showLaunchButton && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/home"
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg
                text-sm font-medium transition-all duration-300 ease-in-out transform hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 whitespace-nowrap"
            >
              Launch App
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
