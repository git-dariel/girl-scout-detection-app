import { useState } from "react";
import { toast } from "sonner";
import { DetectionResult } from "../components/DetectionResult";
import { ImageUpload } from "../components/ImageUpload";
import { detectUniform } from "../services/imageDetectionService";

interface DetectionResultType {
  confidence_score: number;
  details: string[];
  is_authentic: boolean;
  message: string;
  original_image_url: string;
  processed_image_url: string;
}

export const Home = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResultType | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleImageSelect = async (file: File) => {
    try {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsScanning(true);
      // Initialize with empty result to show scanning UI
      setDetectionResult({
        confidence_score: 0,
        details: [],
        is_authentic: false,
        message: "",
        original_image_url: imageUrl,
        processed_image_url: imageUrl,
      });

      const result = await detectUniform(file);
      setDetectionResult(result);

      // Show success toast after scanning
      toast.success(
        `Analysis complete - ${
          result.is_authentic ? "Authentic uniform detected!" : "Non-authentic uniform detected"
        }`
      );
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
      // Reset on error
      setSelectedImage(null);
      setDetectionResult(null);
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setDetectionResult(null);
    setIsScanning(false);
    toast.success("Ready for another analysis!");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-500/10" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            {!selectedImage && (
              <div className="text-center mb-12 space-y-6">
                <div className="inline-block">
                  <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
                    <span className="inline-block bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text pb-2">
                      Smart Scout
                    </span>
                    {` `}
                    <span className="inline-block text-white/90">AI Detector</span>
                  </h1>
                </div>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Upload an image to detect authentic Girl Scout uniforms using our advanced AI
                  analysis system
                </p>
              </div>
            )}

            <div
              className={`mx-auto ${
                !selectedImage ? "max-w-xl backdrop-blur-lg rounded-2xl border border-white/10" : ""
              }`}
            >
              {!selectedImage ? (
                <ImageUpload onImageSelect={handleImageSelect} isLoading={isScanning} />
              ) : detectionResult ? (
                <DetectionResult
                  imageUrl={selectedImage}
                  result={detectionResult}
                  onReset={handleReset}
                  isScanning={isScanning}
                />
              ) : null}
            </div>

            {!selectedImage && (
              <div className="mt-16 text-center">
                <p className="text-sm text-gray-500">
                  Powered by advanced AI technology for accurate uniform detection
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
