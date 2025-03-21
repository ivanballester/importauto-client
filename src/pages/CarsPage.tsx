import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import service from "../service/service.config";

import {
  Filter,
  Sort,
  CarCard,
  Loading,
  ErrorMessage,
  SearchBar,
  Pagination,
  SortModal,
  FiltersModal,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const carsPerPage = 6;
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    brands: string[];
    year: { min: number; max: number };
    price: { min: number; max: number };
    kilometers: { min: number; max: number };
    fuelTypes: string[];
    horsepower: { min: number; max: number };
    seats: { min: number; max: number };
    transmissions: string[];
  }>({
    brands: [],
    year: { min: 1950, max: 2025 },
    price: { min: 0, max: 300000 },
    kilometers: { min: 0, max: 300000 },
    fuelTypes: [],
    horsepower: { min: 0, max: 1000 },
    seats: { min: 0, max: 10 },
    transmissions: [],
  });

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
      setFilteredCars((prevCars) =>
        prevCars.filter((car) => car._id !== carId)
      );
    } catch (error) {
      console.error("Error al eliminar coche", error);
    }
  };

  const handleSearch = (query: string) => {
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

  const handleSort = (criteria: string, order: string) => {
    const sortedCars = [...filteredCars].sort((a, b) => {
      const valueA = a[criteria as keyof Car];
      const valueB = b[criteria as keyof Car];

      if (order === "asc") return valueA > valueB ? 1 : -1;
      if (order === "desc") return valueA < valueB ? 1 : -1;

      return 0;
    });

    setFilteredCars(sortedCars);
  };

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

  const applyFilters = async () => {
    try {
      setIsFilterModalOpen(false);

      const params: Record<string, any> = {};

      if (selectedFilters.brands.length > 0) {
        params.brand = selectedFilters.brands.join(",");
      }
      if (selectedFilters.year.min !== 1950) {
        params.yearMin = selectedFilters.year.min;
      }
      if (selectedFilters.year.max !== 2025) {
        params.yearMax = selectedFilters.year.max;
      }
      if (selectedFilters.price.min > 0) {
        params.priceMin = selectedFilters.price.min;
      }
      if (selectedFilters.price.max < 300000) {
        params.priceMax = selectedFilters.price.max;
      }
      if (selectedFilters.kilometers.min > 0) {
        params.kilometersMin = selectedFilters.kilometers.min;
      }
      if (selectedFilters.kilometers.max < 300000) {
        params.kilometersMax = selectedFilters.kilometers.max;
      }
      if (selectedFilters.fuelTypes.length > 0) {
        params.fuelType = selectedFilters.fuelTypes.join(",");
      }
      if (selectedFilters.horsepower.min > 0) {
        params.horsepowerMin = selectedFilters.horsepower.min;
      }
      if (selectedFilters.horsepower.max < 1000) {
        params.horsepowerMax = selectedFilters.horsepower.max;
      }
      if (selectedFilters.seats.min > 0) {
        params.seatsMin = selectedFilters.seats.min;
      }
      if (selectedFilters.seats.max < 10) {
        params.seatsMax = selectedFilters.seats.max;
      }
      if (selectedFilters.transmissions.length > 0) {
        params.transmission = selectedFilters.transmissions.join(",");
      }

      setSearchParams(params);

      const res = await service.get("/cars/filters", { params });
      setFilteredCars(res.data);
    } catch (error) {
      console.error("Error al aplicar filtros", error);
    }
  };

  const clearFilters = () => {
    setSelectedFilters({
      brands: [],
      year: { min: 1950, max: 2025 },
      price: { min: 0, max: 300000 },
      kilometers: { min: 0, max: 300000 },
      fuelTypes: [],
      horsepower: { min: 0, max: 1000 },
      seats: { min: 0, max: 10 },
      transmissions: [],
    });
    setSearchParams({});
    setFilteredCars(cars);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-center items-center max-w-screen-xl mx-auto ">
        <div className=" relative flex items-center justify-center border rounded-lg py-2 px-4 w-full max-w-[300px] ml-4 cursor-pointer">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
          >
            <Filter />
            <span className="ml-2">Filtros</span>
          </div>
          <FiltersModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            cars={cars}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
          />
        </div>

        <div
          className="relative flex items-center justify-center border rounded-lg py-2 px-4 w-full max-w-[300px] mr-4"
          onClick={() => setIsSortModalOpen(!isSortModalOpen)}
        >
          <div className="flex items-center cursor-pointer">
            <Sort />
            <span className="ml-2">Ordenar por</span>
          </div>

          <SortModal
            isOpen={isSortModalOpen}
            onClose={() => setIsSortModalOpen(false)}
            onSort={handleSort}
          />
        </div>
      </div>

      {currentCars.length === 0 && (
        <p className="text-center">No se encontraron coches.</p>
      )}
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
