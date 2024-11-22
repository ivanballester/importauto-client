import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import placeholder from "../assets/carplaceholder.png";

interface CarCarouselProps {
  imageUrls: string[];
}

const CarCarousel: React.FC<CarCarouselProps> = ({ imageUrls }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = placeholder;
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
  };

  return (
    <div className="relative">
      <Slider {...carouselSettings}>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <img
              src={url}
              alt={`Imagen ${index + 1}`}
              className="w-full h-64 object-cover rounded-t-lg"
              onError={handleImageError}
            />
          </div>
        ))}
      </Slider>

      {/* Barra de progreso personalizada */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {imageUrls.map((_, index) => (
          <div
            key={index}
            className={`w-12 h-1 rounded-full ${
              index === currentSlide ? "bg-rojo" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarCarousel;
