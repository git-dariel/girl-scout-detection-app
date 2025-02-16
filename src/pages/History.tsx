import { useEffect, useState } from "react";
import { getAllDetectedUniforms } from "../services/imageDetectionService";

interface Detection {
  _id: string;
  is_authentic: boolean;
  confidence_score: number;
  message: string;
  details: string[];
  original_image_url: string;
  processed_image_url: string;
  graph_url: string;
  graph_analysis: {
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
  };
  uniform_type: string;
  raw_predictions: number[];
  created_at: string;
}

const History = () => {
  const [detections, setDetections] = useState<Detection[]>([]);
  const [filteredDetections, setFilteredDetections] = useState<Detection[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "true" | "false">("all");

  useEffect(() => {
    const fetchDetections = async () => {
      try {
        const response = await getAllDetectedUniforms({
          page,
          per_page: 10,
        });
        setDetections(response.uniforms || []);
        setFilteredDetections(response.uniforms || []);
        setTotalPages(Math.ceil((response.total || 0) / 10));
      } catch (error) {
        console.error("Error fetching detections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetections();
  }, [page]);

  // Apply filters whenever search term or status filter changes
  useEffect(() => {
    let filtered = [...detections];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((detection) => {
        const status = detection.is_authentic ? "authentic" : "not authentic";
        return status.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (detection) => detection.is_authentic === (statusFilter === "true")
      );
    }

    setFilteredDetections(filtered);
  }, [searchTerm, statusFilter, detections]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value as "all" | "true" | "false");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00DC82]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Detection History</h1>

      {/* Filters */}
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by status..."
          className="px-4 py-2 bg-[#1a2e2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DC82] text-white w-full sm:w-48"
        />
        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="px-4 py-2 bg-[#1a2e2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DC82] text-white w-full sm:w-auto"
        >
          <option value="all">All Status</option>
          <option value="true">Authentic</option>
          <option value="false">Not Authentic</option>
        </select>
      </div>

      {/* Detections Table/Cards */}
      <div className="bg-[#1a2e2a] rounded-lg overflow-hidden">
        {filteredDetections.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full text-left">
                <thead className="bg-[#0A1F1C]">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Original Image</th>
                    <th className="p-4">Processed Image</th>
                    <th className="p-4">Confidence</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDetections.map((detection) => (
                    <tr key={detection._id} className="border-t border-[#0A1F1C]">
                      <td className="p-4">{new Date(detection.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <img
                          src={detection.original_image_url}
                          alt="Original uniform"
                          className="w-16 h-16 object-cover rounded cursor-pointer hover:scale-150 transition-transform"
                        />
                      </td>
                      <td className="p-4">
                        <img
                          src={detection.processed_image_url}
                          alt="Processed uniform"
                          className="w-16 h-16 object-cover rounded cursor-pointer hover:scale-150 transition-transform"
                        />
                      </td>
                      <td className="p-4">{detection.confidence_score.toFixed(1)}%</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            detection.is_authentic
                              ? "bg-[#00DC82]/20 text-[#00DC82]"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {detection.is_authentic ? "Authentic" : "Not Authentic"}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedDetection(detection)}
                          className="px-3 py-1 bg-[#00DC82] text-white rounded-lg hover:bg-[#00DC82]/90"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4">
              {filteredDetections.map((detection) => (
                <div key={detection._id} className="bg-[#0A1F1C] rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-400">
                      {new Date(detection.created_at).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        detection.is_authentic
                          ? "bg-[#00DC82]/20 text-[#00DC82]"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {detection.is_authentic ? "Authentic" : "Not Authentic"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <img
                      src={detection.original_image_url}
                      alt="Original uniform"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <img
                      src={detection.processed_image_url}
                      alt="Processed uniform"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#00DC82] font-medium">
                      {detection.confidence_score.toFixed(1)}% Confidence
                    </span>
                    <button
                      onClick={() => setSelectedDetection(detection)}
                      className="px-3 py-1 bg-[#00DC82] text-white rounded-lg hover:bg-[#00DC82]/90 text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 p-4 border-t border-[#0A1F1C]">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg bg-[#0A1F1C] disabled:opacity-50 hover:bg-[#00DC82] disabled:hover:bg-[#0A1F1C] text-sm"
              >
                Previous
              </button>
              <span className="text-gray-400 text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg bg-[#0A1F1C] disabled:opacity-50 hover:bg-[#00DC82] disabled:hover:bg-[#0A1F1C] text-sm"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-gray-400">
            {searchTerm || statusFilter !== "all"
              ? "No detections found matching the filters"
              : "No detections found"}
          </div>
        )}
      </div>

      {/* Details Modal - Make it responsive */}
      {selectedDetection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0A1F1C] rounded-lg p-4 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold">Detection Details</h2>
              <button
                onClick={() => setSelectedDetection(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Original Image</h3>
                  <img
                    src={selectedDetection.original_image_url}
                    alt="Original"
                    className="w-full rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Processed Image</h3>
                  <img
                    src={selectedDetection.processed_image_url}
                    alt="Processed"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>

              {/* Analysis Results */}
              <div className="bg-[#1a2e2a] p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Analysis Results</h3>
                <p className="text-[#00DC82] mb-2 text-sm">{selectedDetection.message}</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                  {selectedDetection.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              {/* Model Performance */}
              <div className="bg-[#1a2e2a] p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Model Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-gray-400">Accuracy</h4>
                    <p className="text-sm">{selectedDetection.graph_analysis.accuracy.analysis}</p>
                    <p className="text-sm text-[#00DC82]">
                      {selectedDetection.graph_analysis.accuracy.training}
                    </p>
                    <p className="text-sm text-[#00DC82]">
                      {selectedDetection.graph_analysis.accuracy.validation}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400">Metrics</h4>
                    <p className="text-sm">
                      {selectedDetection.graph_analysis.additional_metrics.precision}
                    </p>
                    <p className="text-sm">
                      {selectedDetection.graph_analysis.additional_metrics.recall}
                    </p>
                  </div>
                </div>
              </div>

              {/* Graph */}
              {selectedDetection.graph_url && (
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Performance Graph</h3>
                  <img
                    src={selectedDetection.graph_url}
                    alt="Performance Graph"
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
