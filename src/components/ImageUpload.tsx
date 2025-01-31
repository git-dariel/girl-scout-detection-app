import { ChangeEvent, DragEvent, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading?: boolean;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes

export const ImageUpload = ({ onImageSelect, isLoading = false }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 1MB limit. Please choose a smaller file.");
      return false;
    }

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPEG, PNG).");
      return false;
    }

    return true;
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        onImageSelect(file);
      }
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onImageSelect(file);
      }
    }
  };

  return (
    <div className="relative p-8">
      {/* Animated border */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-300
          ${isDragging ? "opacity-100" : "opacity-0"}
          ${isLoading ? "animate-pulse" : ""}
        `}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 animate-border-rotate" />
      </div>

      <div
        className={`relative w-full rounded-xl backdrop-blur-xl
          ${isDragging ? "bg-white/10" : "bg-white/5"}
          border border-white/10 transition-all duration-300`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8">
          <div className="text-center space-y-6">
            {/* Animated upload icon */}
            <div className="relative w-32 h-32 mx-auto">
              <div
                className={`absolute inset-0 rounded-full
                ${isLoading ? "animate-ping bg-green-400/20" : "bg-white/5"}`}
              />
              <div className="relative flex items-center justify-center w-full h-full">
                <svg
                  className={`w-16 h-16 text-green-400 transition-transform duration-300
                    ${isDragging ? "scale-110" : "scale-100"}
                    ${isLoading ? "animate-bounce" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
            </div>

            {/* Text content */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-white/90">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Processing</span>
                    <span className="flex space-x-1">
                      <span
                        className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  </div>
                ) : (
                  "Drop your image here"
                )}
              </h3>
              <p className="text-sm text-white/60">or</p>
            </div>

            {/* Upload button */}
            <div className="flex flex-col items-center space-y-4">
              <label className="group relative">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                  disabled={isLoading}
                />
                <div className="relative px-6 py-3 rounded-lg overflow-hidden cursor-pointer">
                  {/* Button background animation */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-90
                    group-hover:opacity-100 transition-opacity"
                  />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]
                    group-hover:opacity-75 transition-opacity"
                  />

                  {/* Button content */}
                  <span className="relative text-sm font-medium text-white group-hover:text-white/90">
                    Choose File
                  </span>
                </div>
              </label>

              <p className="text-xs text-white/40">Supported formats: JPEG, PNG (Max size: 1MB)</p>
            </div>

            {/* Loading indicator */}
            {isLoading && (
              <div className="mt-6">
                <div className="w-48 h-1 mx-auto bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 w-1/2 animate-loading-bar" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
