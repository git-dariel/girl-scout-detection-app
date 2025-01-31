import { motion } from "framer-motion";
import { ImageScanner } from "./ImageScanner";

interface DetectionResultProps {
  imageUrl: string;
  result: {
    confidence_score: number;
    details: string[];
    is_authentic: boolean;
    message: string;
    original_image_url: string;
    processed_image_url: string;
  };
  onReset: () => void;
  isScanning?: boolean;
}

export const DetectionResult = ({
  imageUrl,
  result,
  onReset,
  isScanning = false,
}: DetectionResultProps) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="relative bg-[#0a0a0a]/40 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          {/* Left Column - Image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-square bg-black/20 rounded-xl overflow-hidden">
              <img src={imageUrl} alt="Analyzed image" className="w-full h-full object-contain" />
              {/* Scanning overlay */}
              <ImageScanner isScanning={isScanning} />
              {/* Results overlay - only show when not scanning */}
              {!isScanning && (
                <>
                  {/* Status Label */}
                  {/* <div className="absolute top-4 left-4 text-2xl font-bold">
                    <span className={result.is_authentic ? "text-green-500" : "text-red-500"}>
                      {result.is_authentic ? "Authentic Uniform" : "Fake Uniform"}
                    </span>
                  </div> */}
                  {/* Confidence Score Label */}
                  {/* <div className="absolute top-14 left-4 text-4xl font-bold">
                    <span className={result.is_authentic ? "text-green-500" : "text-red-500"}>
                      {result.confidence_score.toFixed(1)}%
                    </span>
                  </div> */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium 
                        ${
                          result.is_authentic
                            ? "bg-green-500/90 text-white"
                            : "bg-red-500/90 text-white"
                        }
                        backdrop-blur-md shadow-lg`}
                    >
                      {result.is_authentic ? "Authentic ✓" : "Not Authentic ✗"}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Analysis Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-green-400">
                {isScanning ? "Analyzing Image..." : "Analysis Results"}
              </h3>
              {!isScanning && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onReset}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg
                    text-sm font-medium transition-all duration-300 ease-in-out 
                    hover:bg-green-600 focus:outline-none focus:ring-2 
                    focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
                >
                  New Analysis →
                </motion.button>
              )}
            </div>

            {/* Only show details when not scanning */}
            {!isScanning && (
              <>
                {/* Confidence Score Card */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4">Confidence Score</h4>
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute inset-y-0 left-0 ${
                        result.is_authentic
                          ? "bg-gradient-to-r from-green-500 to-green-400"
                          : "bg-gradient-to-r from-red-500 to-red-400"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence_score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mt-2 flex justify-end">
                    <span
                      className={`text-sm font-medium ${
                        result.is_authentic ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {result.confidence_score.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Detection Details */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4">Detection Details</h4>
                  <ul className="space-y-3">
                    {result.details.map((detail: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-start animate-fadeIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 mt-1">
                          <svg
                            className="w-full h-full text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4"
                            />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Message */}
                <div className="bg-blue-500/10 backdrop-blur-md rounded-xl p-6 border border-blue-500/20">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <svg
                        className="text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-blue-100 leading-relaxed flex-1">{result.message}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
