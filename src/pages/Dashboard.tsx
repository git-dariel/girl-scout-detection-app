import { useEffect, useState } from "react";
import { getAllDetectedUniforms } from "../services/imageDetectionService";

interface DetectedUniform {
  _id: string;
  created_at: string;
  is_authentic: boolean;
  confidence_score: number;
  message: string;
  original_image_url: string;
}

interface DashboardStats {
  total_detections: number;
  authentic_uniforms: number;
  non_authentic_uniforms: number;
  average_confidence: number;
  recent_detections: DetectedUniform[];
}

const CircularProgress = ({
  value,
  label,
  count,
}: {
  value: number;
  label: string;
  count: number;
}) => (
  <div className="relative w-full pt-[100%] max-w-[150px] mx-auto">
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle className="stroke-[#1a2e2a] fill-none" cx="50" cy="50" r="40" strokeWidth="8" />
        {/* Progress circle */}
        <circle
          className="stroke-[#00DC82] fill-none transition-all duration-1000 ease-out"
          cx="50"
          cy="50"
          r="40"
          strokeWidth="8"
          strokeDasharray={`${value * 2.51} 251.2`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#00DC82]">{count}</span>
        <span className="text-[11px] text-gray-400 mt-1 text-center px-2 font-medium">{label}</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAllDetectedUniforms();
        const uniforms = response.uniforms || [];

        // Calculate statistics from uniforms data
        const total_detections = uniforms.length;
        const authentic_uniforms = uniforms.filter(
          (uniform: DetectedUniform) => uniform.is_authentic
        ).length;
        const non_authentic_uniforms = total_detections - authentic_uniforms;
        const average_confidence =
          uniforms.reduce((acc: number, curr: DetectedUniform) => acc + curr.confidence_score, 0) /
          total_detections;

        // Get the 5 most recent detections
        const recent_detections = [...uniforms]
          .sort(
            (a: DetectedUniform, b: DetectedUniform) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          .slice(0, 5);

        setStats({
          total_detections,
          authentic_uniforms,
          non_authentic_uniforms,
          average_confidence,
          recent_detections,
        });
      } catch (error) {
        console.error("Error fetching uniforms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00DC82]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard</h1>
        <span className="text-xs md:text-sm text-gray-400">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {/* Total Detections */}
        <div className="bg-[#0a1f1c] rounded-lg p-3 md:p-6">
          <CircularProgress
            value={100}
            label="Total Detections"
            count={stats?.total_detections || 0}
          />
        </div>

        {/* Authentic Uniforms */}
        <div className="bg-[#0a1f1c] rounded-lg p-3 md:p-6">
          <CircularProgress
            value={
              stats?.total_detections
                ? (stats.authentic_uniforms / stats.total_detections) * 100
                : 0
            }
            label="Authentic Uniforms"
            count={stats?.authentic_uniforms || 0}
          />
        </div>

        {/* Non-Authentic Uniforms */}
        <div className="bg-[#0a1f1c] rounded-lg p-3 md:p-6">
          <CircularProgress
            value={
              stats?.total_detections
                ? (stats.non_authentic_uniforms / stats.total_detections) * 100
                : 0
            }
            label="Non-Authentic"
            count={stats?.non_authentic_uniforms || 0}
          />
        </div>

        {/* Average Confidence */}
        <div className="bg-[#0a1f1c] rounded-lg p-3 md:p-6">
          <CircularProgress
            value={stats?.average_confidence ? stats.average_confidence : 0}
            label="Avg. Confidence"
            count={stats?.average_confidence ? Math.round(stats.average_confidence) : 0}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#0a1f1c] rounded-lg overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-800">
          <h2 className="text-lg md:text-xl font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="p-4 md:p-6">
          {stats?.recent_detections?.length ? (
            <div className="space-y-3 md:space-y-4">
              {stats.recent_detections.map((detection) => (
                <div
                  key={detection._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 md:p-4 bg-black/20 rounded-lg"
                >
                  {/* Image and Basic Info */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16">
                      <img
                        src={detection.original_image_url}
                        alt="Uniform"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 line-clamp-2">{detection.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(detection.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Status and Confidence */}
                  <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-3 mt-2 sm:mt-0 w-full sm:w-auto sm:ml-auto">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        detection.is_authentic
                          ? "bg-[#00DC82]/20 text-[#00DC82]"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {detection.is_authentic ? "Authentic" : "Not Authentic"}
                    </span>
                    <span className="text-[#00DC82] text-sm font-medium sm:text-right">
                      {detection.confidence_score.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-6 md:py-8">No recent detections</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
