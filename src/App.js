import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Make sure this is imported
const API_BASE_URL = "https://foodimages-api-test.onrender.com";

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
    
      setImage(null);
      fetchImage();
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("Failed to submit rating. Please try again.");
    }
  };

  return (
    <div className="mobile-container">
      <h1 className="instruction-text">
        If your friend posted this photo of some food on Instagram, how impressed, from a 1 - 10, would you be by the photo they took. Please try to ignore the meal itself and the resolution of the photo.
      </h1>
      
      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="status-text error">{error}</p>}
      
      {image && (
        <>
          <img
            src={image.url}
            alt="Random"
            className="responsive-image"
          />
          <div className="rating-buttons">
            {[...Array(11).keys()].map((num) => (
              <button
                key={num}
                onClick={() => submitRating(num)}
                className="rating-button"
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