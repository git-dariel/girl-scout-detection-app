import { motion } from "framer-motion";

interface ImageScannerProps {
  isScanning: boolean;
}

export const ImageScanner = ({ isScanning }: ImageScannerProps) => {
  if (!isScanning) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Scanning line */}
      <motion.div
        className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
        initial={{ top: 0 }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Scanning overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-50" />

      {/* Grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Scanning text */}
      <div className="absolute top-4 left-4 right-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-green-400 font-mono text-sm"
        >
          SCANNING...
        </motion.div>
        <div className="mt-1 flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 w-1 rounded-full bg-green-400"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Binary numbers effect */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <motion.div
          className="font-mono text-xs text-green-400/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i}>{Math.random().toString(2).slice(2, 10)}</div>
          ))}
        </motion.div>
        <motion.div
          className="font-mono text-xs text-green-400/70 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i}>{Math.random().toString(2).slice(2, 10)}</div>
          ))}
        </motion.div>
      </div>

      {/* Corner brackets */}
      <div className="absolute inset-0 p-4">
        <div className="w-full h-full border-2 border-transparent">
          {/* Top-left corner */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-green-400" />
          {/* Top-right corner */}
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-green-400" />
          {/* Bottom-left corner */}
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-green-400" />
          {/* Bottom-right corner */}
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-green-400" />
        </div>
      </div>
    </div>
  );
};
