import { Link } from "react-router-dom";
import girlScoutLogo from "../assets/girl-scout-logo.avif";

interface NavigationProps {
  showLaunchButton?: boolean;
}

export const Navigation = ({ showLaunchButton = true }: NavigationProps) => {
  return (
    <nav className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={girlScoutLogo}
            alt="Smart Scout Logo"
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </Link>
        {showLaunchButton && (
          <Link
            to="/home"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg
              text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 whitespace-nowrap
              hover:from-green-700 hover:to-emerald-700 transition-colors"
          >
            Launch App
          </Link>
        )}
      </div>
    </nav>
  );
};
