import { motion } from "framer-motion";
import { ImageScanner } from "./ImageScanner";

interface GraphAnalysis {
  accuracy: {
    trend: string;
    training: string;
    validation: string;
    analysis: string;
  };
  loss: {
    trend: string;
    values: {
      classification: string;
      regularization: string;
      total: string;
    };
    analysis: string;
  };
  additional_metrics: {
    trend: string;
    precision: string;
    recall: string;
    analysis: string;
  };
}

interface DetectionResultProps {
  imageUrl: string;
  result: {
    confidence_score: number;
    details: string[];
    is_authentic: boolean;
    message: string;
    original_image_url: string;
    processed_image_url: string;
    graph_url?: string;
    graph_analysis?: GraphAnalysis;
    raw_predictions?: number[];
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
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative bg-[#0a0a0a]/40 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/10">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header with Title and Reset Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-bold text-green-400">
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

          {/* Centered Image Container */}
          <div className="max-w-md mx-auto">
            <div className="relative aspect-square bg-black/20 rounded-xl overflow-hidden">
              <img src={imageUrl} alt="Original image" className="w-full h-full object-contain" />
              {/* Scanning overlay */}
              <ImageScanner isScanning={isScanning} />
              {/* Results overlay - only show when not scanning */}
              {!isScanning && (
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
              )}
            </div>
          </div>

          {/* Analysis Content */}
          {!isScanning && (
            <div className="space-y-4">
              {/* Detection Result */}
              <div className="bg-[#0a1f1c] rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Detection Result</h4>
                <p className="text-[#00DC82] font-medium">{result.message}</p>
              </div>

              {/* Confidence Score */}
              <div className="bg-[#0a1f1c] rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Confidence Score</h4>
                <div className="relative h-2 bg-black/20 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#00DC82]"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence_score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <span className="text-sm text-[#00DC82]">
                    {result.confidence_score.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Model Performance */}
              {result.graph_analysis && (
                <div className="bg-[#0a1f1c] rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Model Performance</h4>
                  <div className="space-y-3">
                    {/* Accuracy Analysis */}
                    <div>
                      <p className="text-sm text-gray-300 mb-1">
                        {result.graph_analysis.accuracy.analysis}
                      </p>
                      <p className="text-sm text-[#00DC82]">
                        {result.graph_analysis.accuracy.training}
                      </p>
                      <p className="text-sm text-[#00DC82]">
                        {result.graph_analysis.accuracy.validation}
                      </p>
                    </div>

                    {/* Loss Analysis */}
                    <div>
                      <p className="text-sm text-gray-300 mb-1">
                        {result.graph_analysis.loss.analysis}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-[#00DC82]">
                          {result.graph_analysis.loss.values.classification}
                        </p>
                        <p className="text-sm text-[#00DC82]">
                          {result.graph_analysis.loss.values.regularization}
                        </p>
                      </div>
                    </div>

                    {/* Additional Metrics */}
                    <div>
                      <p className="text-sm text-gray-300 mb-1">
                        {result.graph_analysis.additional_metrics.analysis}
                      </p>
                      <p className="text-sm text-[#00DC82]">
                        {result.graph_analysis.additional_metrics.precision}
                      </p>
                      <p className="text-sm text-[#00DC82]">
                        {result.graph_analysis.additional_metrics.recall}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Analysis Details */}
              <div className="bg-[#0a1f1c] rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Analysis Details</h4>
                <ul className="space-y-2">
                  {result.details.map((detail: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start text-sm animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-[#00DC82] mr-2">•</span>
                      <span className="text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Performance Graph */}
              {result.graph_url && (
                <div className="bg-[#0a1f1c] rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Performance Graph</h4>
                  <img
                    src={result.graph_url}
                    alt="Model performance graph"
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
