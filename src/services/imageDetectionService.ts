interface FilterParams {
  page?: number;
  per_page?: number;
  is_authentic?: boolean;
  uniform_type?: string;
  min_confidence?: number;
  start_date?: string;
  end_date?: string;
}

// Determine environment and use appropriate API URL
const LOCAL_API_URL = "http://127.0.0.1:5000";
// const PRODUCTION_API_URL = "https://smart-dev-e7f2abec9106.herokuapp.com";

// Dynamic API URL based on environment
const API_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? LOCAL_API_URL
    : "https://smart-dev-e7f2abec9106.herokuapp.com";

export const detectUniform = async (image: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(`${API_URL}/api/detect-uniform`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to detect uniform: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error detecting uniform:", error);
    throw error;
  }
};

export const getAllDetectedUniforms = async (filters: FilterParams = {}): Promise<any> => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(
      // `https://girl-scout-detection-api.onrender.com/api/get/all/detected-uniforms?${params}`,
      `${API_URL}/api/get/all/detected-uniforms?${params}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get detected uniforms: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting detected uniforms:", error);
    throw error;
  }
};

export const getDetectedUniform = async (uniformId: string): Promise<any> => {
  try {
    const response = await fetch(
      // `https://girl-scout-detection-api.onrender.com/api/get/detected-uniforms/${uniformId}`,
      `${API_URL}/api/get/detected-uniforms/${uniformId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get detected uniform: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting detected uniform:", error);
    throw error;
  }
};

export const updateDetectedUniform = async (uniformId: string, updates: any): Promise<any> => {
  try {
    const response = await fetch(
      // `https://girl-scout-detection-api.onrender.com/api/update/detected-uniforms/${uniformId}`,
      `${API_URL}/api/update/detected-uniforms/${uniformId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update detected uniform: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating detected uniform:", error);
    throw error;
  }
};

export const deleteDetectedUniform = async (uniformId: string): Promise<any> => {
  try {
    const response = await fetch(
      // `https://girl-scout-detection-api.onrender.com/api/delete/detected-uniforms/${uniformId}`,
      `${API_URL}/api/delete/detected-uniforms/${uniformId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete detected uniform: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting detected uniform:", error);
    throw error;
  }
};

export const getDetectionStatistics = async (): Promise<any> => {
  try {
    const response = await fetch(
      // "https://girl-scout-detection-api.onrender.com/api/get/detected-uniforms/statistics",
      `${API_URL}/api/get/detected-uniforms/statistics`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get detection statistics: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting detection statistics:", error);
    throw error;
  }
};

export const getProcessedImage = async (imageId: string): Promise<any> => {
  try {
    const response = await fetch(
      // `https://girl-scout-detection-api.onrender.com/api/get/processed-image/${imageId}`,
      `${API_URL}/api/get/processed-image/${imageId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get processed image: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting processed image:", error);
    throw error;
  }
};
