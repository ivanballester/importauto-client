import FilterBar from "../components/FilterBar";
import { useState, useEffect } from "react";
import service from "../service/service.config";
import placeholder from "../assets/carplaceholder.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import DeleteEditSvg from "../components/DeleteEditSvg";

interface Car {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  seats: number;
  horsepower: number;
  fuelType: string;
  engine: string;
  kilometers: number;
  transmission: string;
  imageUrls: string[];
}

function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCars = async () => {
    try {
      const res = await service.get("/cars");
      setCars(res.data);
    } catch (error) {
      setError("Error al obtener información de los coches");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteCar = async (carId: string) => {
    try {
      await service.delete(`/cars/${carId}`);
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
    } catch (error) {
      console.error("Error al eliminar coche", error);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = placeholder;
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      <FilterBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div
            key={car._id}
            className="m-4 shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300"
          >
            <div className=" relative w-full h-64">
              {car.imageUrls.length > 1 ? (
                <Slider {...carouselSettings}>
                  {car.imageUrls.map((url, index) => (
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
              ) : (
                <img
                  src={
                    car.imageUrls.length > 0 ? car.imageUrls[0] : placeholder
                  }
                  alt="Imagen principal"
                  className="w-full h-full object-cover rounded-t-lg"
                  onError={handleImageError}
                />
              )}
            </div>

            <div className="flex justify-between pb-4">
              <div className="pl-1">
                <h1 className="text-md font-bold">
                  {car.brand} {car.model}
                </h1>
                <p className="text-sm">
                  {car.engine} - {car.transmission}
                </p>
                <p className="text-sm">
                  {car.year} | {car.kilometers}km | {car.horsepower}CV |{" "}
                  {car.fuelType}
                </p>
              </div>
              <div className="pr-1">
                <p className="text-sm line-through">
                  {(car.price * 1.15).toLocaleString("es-ES")}€
                </p>
                <p className="text-md font-bold bg-red-600 rounded-lg text-white">
                  {car.price.toLocaleString("es-ES")}€
                </p>

                <DeleteEditSvg carId={car._id} onDelete={handleDeleteCar} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarsPage;
