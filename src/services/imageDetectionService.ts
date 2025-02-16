interface FilterParams {
  page?: number;
  per_page?: number;
  is_authentic?: boolean;
  uniform_type?: string;
  min_confidence?: number;
  start_date?: string;
  end_date?: string;
}

export const detectUniform = async (image: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(
      "https://girl-scout-detection-api.onrender.com/api/detect-uniform",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to detect uniform");
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
      `https://girl-scout-detection-api.onrender.com/api/get/all/detected-uniforms?${params}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get detected uniforms");
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
      `https://girl-scout-detection-api.onrender.com/api/get/detected-uniforms/${uniformId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get detected uniform");
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
      `https://girl-scout-detection-api.onrender.com/api/update/detected-uniforms/${uniformId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update detected uniform");
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
      `https://girl-scout-detection-api.onrender.com/api/delete/detected-uniforms/${uniformId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete detected uniform");
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
      "https://girl-scout-detection-api.onrender.com/api/get/detected-uniforms/statistics",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get detection statistics");
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
      `https://girl-scout-detection-api.onrender.com/api/get/processed-image/${imageId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get processed image");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting processed image:", error);
    throw error;
  }
};
