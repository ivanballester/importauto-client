import React, { useState, useEffect } from "react";
import service from "../service/service.config";
import {
  Filter,
  Sort,
  CarCard,
  Loading,
  ErrorMessage,
  SearchBar,
  Pagination,
} from "../components";

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

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [carsPerPage, setCarsPerPage] = useState<number>(6);

  const fetchCars = async () => {
    try {
      const res = await service.get("/cars");
      setCars(res.data);
      setFilteredCars(res.data);
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredCars(cars);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredCars(
        cars.filter(
          (car) =>
            car.brand.toLowerCase().includes(lowerCaseQuery) ||
            car.model.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  };

  // Paginación
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCars.length / carsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-center items-center max-w-screen-xl mx-auto ">
        <div className="flex items-center justify-center border rounded-lg py-2 px-4 w-full max-w-[300px] ml-4">
          <Filter />
          <span className="ml-2">Filtros</span>
        </div>

        <div className="flex items-center justify-center border rounded-lg py-2 px-4 w-full max-w-[300px] mr-4">
          <Sort />
          <span className="ml-2">Ordenar por</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto">
        {currentCars.map((car) => (
          <CarCard key={car._id} {...car} handleDeleteCar={handleDeleteCar} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default CarsPage;
