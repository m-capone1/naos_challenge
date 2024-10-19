import { useState, useEffect } from "react";

const ImageSlider = ({ imageResults }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imageResults.length > 0) {
      setCurrentIndex(0);
    }
  }, [imageResults]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageResults.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageResults.length) % imageResults.length
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [imageResults]);

  const currentImage = imageResults[currentIndex];

  return (
    <section className="flex flex-col justify-center items-center">
      {imageResults.length > 0 && currentImage && (
        <div className="relative flex flex-col justify-center items-center">
          <img
            className="w-1/2 md:w-3/5 h-auto rounded-lg"
            src={currentImage.urls.regular}
            alt={currentImage.alt_description || "Image"}
          />
          <p className="mt-2 text-lg">
            {currentIndex + 1} / {imageResults.length}
          </p>
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={prevImage}
              className="rounded-3xl w-32 bg-emerald-600 text-white py-2 px-4 mx-2"
            >
              Previous
            </button>
            <button
              onClick={nextImage}
              className="rounded-3xl w-32 bg-emerald-600 text-white py-2 px-4 mx-2"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {imageResults.length === 0 && (
        <p className="text-red-600">No images available.</p>
      )}
    </section>
  );
};

export default ImageSlider;
