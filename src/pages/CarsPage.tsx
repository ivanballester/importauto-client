// pages/CarsPage.tsx
import React, { useState, useEffect } from "react";
import service from "../service/service.config";
import FilterBar from "../components/FilterBar";
import CarCard from "../components/CarCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

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

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <FilterBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CarCard key={car._id} {...car} handleDeleteCar={handleDeleteCar} />
        ))}
      </div>
    </div>
  );
}

export default CarsPage;
