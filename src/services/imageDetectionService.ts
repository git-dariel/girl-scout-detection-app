export const detectUniform = async (image: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch("http://127.0.0.1:5000/api/detect-uniform", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to detect uniform");
    }

    return await response.json();
  } catch (error) {
    console.error("Error detecting uniform:", error);
    throw error;
  }
};
