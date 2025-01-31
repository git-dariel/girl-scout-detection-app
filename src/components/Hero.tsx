import { Link } from "react-router-dom";

export const Hero = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  };

  return (
    <div className="mt-16 sm:mt-24 lg:mt-32 mb-6 sm:mb-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
          <span className="block bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">
            Smart Scout
          </span>
          <span className="block text-white/90 mt-2">Authentication AI</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 sm:mb-12 mx-auto max-w-2xl">
          Leverage advanced AI technology to instantly verify the authenticity of Girl Scout
          uniforms. Our cutting-edge system provides accurate detection and detailed analysis to
          ensure uniform integrity.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
          <div className="w-full sm:w-auto">
            <Link
              to="/home"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 
                bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 group"
            >
              <span>Get Started</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          <div className="w-full sm:w-auto">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, "features")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 
                border border-white/10 text-white rounded-xl font-medium
                focus:outline-none focus:ring-2 focus:ring-white/10 focus:ring-offset-2"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
