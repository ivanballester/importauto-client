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
  SortModal,
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
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<{ brands: string[] }>({
    brands: [],
  });

  const fetchCars = async () => {
    try {
      const res = await service.get("/cars");
      console.log(res.data);
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
      setFilteredCars((prevCars) =>
        prevCars.filter((car) => car._id !== carId)
      );
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

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    brand: string
  ) => {
    const { checked } = event.target;

    setSelectedFilters((prev) => {
      if (checked) {
        // Añadir la marca si está seleccionada
        return { ...prev, brands: [...prev.brands, brand] };
      } else {
        // Remover la marca si está deseleccionada
        return { ...prev, brands: prev.brands.filter((b) => b !== brand) };
      }
    });
  };
  const applyFilters = async () => {
    try {
      setIsFilterModalOpen(false); // Cierra el modal

      // Llama al backend con los filtros seleccionados
      const res = await service.get("/cars", {
        params: {
          brands: selectedFilters.brands.join(","), // Envía las marcas como una lista separada por comas
        },
      });

      // Actualiza los coches filtrados
      setFilteredCars(res.data);
    } catch (error) {
      console.error("Error al aplicar filtros", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);
  console.log(selectedFilters);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-center items-center max-w-screen-xl mx-auto ">
        <div
          className=" relative flex items-center justify-center border rounded-lg py-2 px-4 w-full max-w-[300px] ml-4 cursor-pointer"
          onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
        >
          <div className="flex items-center cursor-pointer">
            <Filter />
            <span className="ml-2">Filtros</span>
          </div>

          {isFilterModalOpen && (
            <div className="absolute top-full mt-2 bg-white border rounded shadow-lg w-full z-50">
              {/* Encabezado del modal */}
              <div className="px-4 py-2 border-b">
                <span className="font-bold">Filtros</span>
              </div>

              {/* Contenido del modal */}
              <div className="px-4 py-2">
                <p className="mb-2 font-medium">Marcas disponibles</p>

                {cars
                  .map((car: Car) => car.brand)
                  .filter((value, index, self) => self.indexOf(value) === index) // Eliminar duplicados
                  .map((brand: string) => (
                    <div key={brand} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={brand}
                        name={brand}
                        value={brand}
                        checked={selectedFilters.brands.includes(brand)} // Verifica si está seleccionado
                        onChange={(e) => handleCheckboxChange(e, brand)} // Maneja cambios
                      />
                      <label htmlFor={brand} className="ml-2">
                        {brand}
                      </label>
                    </div>
                  ))}
              </div>

              {/* Botones de acción */}
              <div className="px-4 py-2 border-t flex justify-end">
                <button
                  className="mr-2 bg-gray-200 text-gray-800 px-4 py-2 rounded"
                  onClick={() => setIsFilterModalOpen(false)} // Cierra el modal sin aplicar
                >
                  Cerrar
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={applyFilters} // Aplica los filtros y cierra el modal
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          )}
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
