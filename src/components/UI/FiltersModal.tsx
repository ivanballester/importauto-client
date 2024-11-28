import React from "react";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  selectedFilters: any;
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    filterName: string
  ) => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  filters,
  selectedFilters,
  onFilterChange,
}) => {
  // Handler para manejar el cambio en los sliders
  const handleSliderChange = (value: number[], filterName: string) => {
    onFilterChange(
      {
        target: {
          value: value[0],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>,
      `${filterName}.min`
    );
    onFilterChange(
      {
        target: {
          value: value[1],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>,
      `${filterName}.max`
    );
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>

        {/* Marca */}
        <div className="mb-4">
          <label className="block text-gray-700">Marca</label>
          <select
            value={selectedFilters.brand}
            onChange={(e) => onFilterChange(e, "brand")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Seleccionar Marca</option>
            {(filters.brand || []).map((option: any) => (
              <option key={option.name} value={option.name}>
                {option.name} ({option.count})
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de combustible */}
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Combustible</label>
          <select
            value={selectedFilters.fuelType}
            onChange={(e) => onFilterChange(e, "fuelType")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Seleccionar Combustible</option>
            {(filters.fuelType || []).map((option: any) => (
              <option key={option.name} value={option.name}>
                {option.name} ({option.count})
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de motor */}
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Motor</label>
          <select
            value={selectedFilters.engine}
            onChange={(e) => onFilterChange(e, "engine")}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Seleccionar Motor</option>
            {(filters.engine || []).map((option: any) => (
              <option key={option.name} value={option.name}>
                {option.name} ({option.count})
              </option>
            ))}
          </select>
        </div>

        {/* Año */}
        <div className="mb-4">
          <label className="block text-gray-700">Año</label>
          <div className="flex justify-between">
            <input
              type="number"
              value={selectedFilters.year.min}
              onChange={(e) => onFilterChange(e, "year.min")}
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
              min={filters.yearRange.min}
              max={filters.yearRange.max}
            />
            <span className="mx-2">-</span>
            <input
              type="number"
              value={selectedFilters.year.max}
              onChange={(e) => onFilterChange(e, "year.max")}
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
              min={filters.yearRange.min}
              max={filters.yearRange.max}
            />
          </div>
        </div>

        {/* Kilómetros */}
        <div className="mb-4">
          <label className="block text-gray-700">Kilómetros</label>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={filters.maxKilometers}
              value={selectedFilters.kilometers.min}
              onChange={(e) =>
                handleSliderChange(
                  [+e.target.value, selectedFilters.kilometers.max],
                  "kilometers"
                )
              }
              className="w-full"
            />
            <input
              type="range"
              min={0}
              max={filters.maxKilometers}
              value={selectedFilters.kilometers.max}
              onChange={(e) =>
                handleSliderChange(
                  [selectedFilters.kilometers.min, +e.target.value],
                  "kilometers"
                )
              }
              className="absolute top-0 w-full"
            />
          </div>
          <div className="flex justify-between">
            <span>{selectedFilters.kilometers.min} km</span>
            <span>{selectedFilters.kilometers.max} km</span>
          </div>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label className="block text-gray-700">Precio</label>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={filters.maxPrice}
              value={selectedFilters.price.min}
              onChange={(e) =>
                handleSliderChange(
                  [+e.target.value, selectedFilters.price.max],
                  "price"
                )
              }
              className="w-full"
            />
            <input
              type="range"
              min={0}
              max={filters.maxPrice}
              value={selectedFilters.price.max}
              onChange={(e) =>
                handleSliderChange(
                  [selectedFilters.price.min, +e.target.value],
                  "price"
                )
              }
              className="absolute top-0 w-full"
            />
          </div>
          <div className="flex justify-between">
            <span>{selectedFilters.price.min} €</span>
            <span>{selectedFilters.price.max} €</span>
          </div>
        </div>

        {/* Caballos de Fuerza */}
        <div className="mb-4">
          <label className="block text-gray-700">Caballos de Fuerza</label>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={filters.maxHorsepower}
              value={selectedFilters.horsepower.min}
              onChange={(e) =>
                handleSliderChange(
                  [+e.target.value, selectedFilters.horsepower.max],
                  "horsepower"
                )
              }
              className="w-full"
            />
            <input
              type="range"
              min={0}
              max={filters.maxHorsepower}
              value={selectedFilters.horsepower.max}
              onChange={(e) =>
                handleSliderChange(
                  [selectedFilters.horsepower.min, +e.target.value],
                  "horsepower"
                )
              }
              className="absolute top-0 w-full"
            />
          </div>
          <div className="flex justify-between">
            <span>{selectedFilters.horsepower.min} hp</span>
            <span>{selectedFilters.horsepower.max} hp</span>
          </div>
        </div>

        {/* Asientos */}
        <div className="mb-4">
          <label className="block text-gray-700">Asientos</label>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={filters.maxSeats}
              value={selectedFilters.seats.min}
              onChange={(e) =>
                handleSliderChange(
                  [+e.target.value, selectedFilters.seats.max],
                  "seats"
                )
              }
              className="w-full"
            />
            <input
              type="range"
              min={0}
              max={filters.maxSeats}
              value={selectedFilters.seats.max}
              onChange={(e) =>
                handleSliderChange(
                  [selectedFilters.seats.min, +e.target.value],
                  "seats"
                )
              }
              className="absolute top-0 w-full"
            />
          </div>
          <div className="flex justify-between">
            <span>{selectedFilters.seats.min} asientos</span>
            <span>{selectedFilters.seats.max} asientos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
