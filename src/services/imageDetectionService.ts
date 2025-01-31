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
