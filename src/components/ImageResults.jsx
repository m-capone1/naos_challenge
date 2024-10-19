import { useState } from "react";

const ImageSlider = ({ imageResults }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageResults.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageResults.length) % imageResults.length
    );
  };

  return (
    <section className="flex flex-col justify-center items-center">
      {imageResults.length > 0 && (
        <div className="relative flex justify-center items-center">
          <img
            className="w-1/2 h-auto"
            src={imageResults[currentIndex].urls.regular}
            alt={imageResults[currentIndex].alt_description || "Image"}
          />
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2"
          >
            Previous
          </button>
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2"
          >
            Next
          </button>
        </div>
      )}
      {imageResults.length === 0 && <p>No images available.</p>}
    </section>
  );
};

export default ImageSlider;
