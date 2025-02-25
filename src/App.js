import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://foodimages-api-test.onrender.com"; // Replace with your actual Render backend URL

export default function ImageRating() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/api/image`);
      setImage(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      setError("Failed to load image. Please try again.");
    }
    setLoading(false);
  };




  const submitRating = async (rating) => {
    if (!image) return;

    try {
      await axios.post(`${API_BASE_URL}/api/rate`, {
        imageId: image.id,
        rating: rating,
      });
	
      setImage(null); // Clear the current image
      fetchImage(); // Fetch a new image
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("Failed to submit rating. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-xl font-bold">Rate This Image</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {image && (
        <>
		  <img
			  src={image.url}
			  alt="Random"
			  className="responsive-image"
		  />
          <div className="flex gap-2 mt-4">
            {[...Array(11).keys()].map((num) => (
              <button
                key={num}
                onClick={() => submitRating(num)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                {num}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
