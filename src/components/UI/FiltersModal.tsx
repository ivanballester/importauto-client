import React from "react";
import ReactSlider from "react-slider";
import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: {
    brands: string[];
    year: { min: number; max: number };
    price: { min: number; max: number };
    kilometers: { min: number; max: number };
    fuelTypes: string[];
    horsepower: { min: number; max: number };
    seats: { min: number; max: number };
    transmissions: string[];
  };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{
      brands: string[];
      year: { min: number; max: number };
      price: { min: number; max: number };
      kilometers: { min: number; max: number };
      fuelTypes: string[];
      horsepower: { min: number; max: number };
      seats: { min: number; max: number };
      transmissions: string[];
    }>
  >;
  cars: { brand: string; fuelType: string; transmission: string }[];
  applyFilters: () => void;
  clearFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedFilters,
  setSelectedFilters,
  cars,
  applyFilters,
  clearFilters,
}) => {
  const [showBrands, setShowBrands] = useState<boolean>(false);
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [showYear, setShowYear] = useState<boolean>(false);
  const [showKilometers, setShowKilometers] = useState<boolean>(false);
  const [showHorsepower, setShowHorsepower] = useState<boolean>(false);
  const [showSeats, setShowSeats] = useState<boolean>(false);
  const [showTransmissions, setShowTransmissions] = useState<boolean>(false);
  const [showFuelTypes, setShowFuelTypes] = useState<boolean>(false);

  const toggleVisibility = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  if (!isOpen) return null;

  const uniqueBrands = Array.from(new Set(cars.map((car) => car.brand)));
  const uniqueFuelTypes = Array.from(new Set(cars.map((car) => car.fuelType)));
  const uniqueTransmissions = Array.from(
    new Set(cars.map((car) => car.transmission))
  );

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: "brands" | "fuelTypes" | "transmissions",
    value: string
  ) => {
    const { checked } = event.target;

    const updatedFilters = { ...selectedFilters };

    if (checked) {
      updatedFilters[category] = [...updatedFilters[category], value];
    } else {
      updatedFilters[category] = updatedFilters[category].filter(
        (item) => item !== value
      );
    }

    setSelectedFilters(updatedFilters);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full h-full max-w-lg p-4 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-2 border-b">
          <span className="font-bold">Filtros</span>
        </div>

        <div className="px-4 py-2 ">
          <p
            className="mb-2 font-medium cursor-pointer"
            onClick={() => toggleVisibility(setShowBrands)}
          >
            Marcas disponibles
            {showBrands ? " -" : " +"}
          </p>
          {showBrands && (
            <div>
              {uniqueBrands.map((brand: string) => (
                <div key={brand} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={brand}
                    name={brand}
                    checked={selectedFilters.brands.includes(brand)}
                    onChange={(e) => handleCheckboxChange(e, "brands", brand)}
                  />
                  <label htmlFor={brand} className="ml-2">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          )}
          <p
            className="mb-2 mt-6 font-medium cursor-pointer"
            onClick={() => toggleVisibility(setShowFuelTypes)}
          >
            Tipo de Combustible
            {showFuelTypes ? " -" : " +"}
          </p>
          {showFuelTypes &&
            uniqueFuelTypes.map((fuelType: string) => (
              <div key={fuelType} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={fuelType}
                  name={fuelType}
                  checked={selectedFilters.fuelTypes.includes(fuelType)}
                  onChange={(e) =>
                    handleCheckboxChange(e, "fuelTypes", fuelType)
                  }
                />
                <label htmlFor={fuelType} className="ml-2">
                  {fuelType}
                </label>
              </div>
            ))}
          <p
            className="mb-2 mt-6 font-medium"
            onClick={() => toggleVisibility(setShowTransmissions)}
          >
            Transmision {showTransmissions ? " -" : " +"}
          </p>
          {showTransmissions && (
            <div>
              {uniqueTransmissions.map((transmission: string) => (
                <div key={transmission} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={transmission}
                    name={transmission}
                    checked={selectedFilters.transmissions.includes(
                      transmission
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(e, "transmissions", transmission)
                    }
                  />
                  <label htmlFor={transmission} className="ml-2">
                    {transmission}
                  </label>
                </div>
              ))}
            </div>
          )}
          <p
            className="mb-2 mt-6 font-medium"
            onClick={() => toggleVisibility(setShowYear)}
          >
            Año {showYear ? " -" : " +"}
          </p>
          {showYear && (
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="thumb"
              trackClassName="track"
              value={[selectedFilters.year.min, selectedFilters.year.max]}
              min={1950}
              max={2025}
              onChange={(value: number[]) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  year: { min: value[0], max: value[1] },
                }))
              }
              renderThumb={(props, state) => (
                <div {...props} key={props.key}>
                  <p className="pt-4 text-sm">{state.valueNow}</p>
                </div>
              )}
            />
          )}

          <p
            className="mt-6 mb-2 font-medium"
            onClick={() => toggleVisibility(setShowPrice)}
          >
            Precio {showPrice ? " -" : " +"}
          </p>
          {showPrice && (
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="thumb"
              trackClassName="track"
              value={[selectedFilters.price.min, selectedFilters.price.max]}
              min={0}
              max={300000}
              step={1000}
              onChange={(value: number[]) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  price: { min: value[0], max: value[1] },
                }))
              }
              renderThumb={(props, state) => (
                <div {...props} key={props.key}>
                  <p className="pt-4 text-sm">{state.valueNow}€</p>
                </div>
              )}
            />
          )}

          <p
            className="mt-6 mb-2 font-medium"
            onClick={() => toggleVisibility(setShowKilometers)}
          >
            Kilómetros {showKilometers ? " -" : " +"}
          </p>
          {showKilometers && (
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="thumb"
              trackClassName="track"
              value={[
                selectedFilters.kilometers.min,
                selectedFilters.kilometers.max,
              ]}
              min={0}
              max={300000}
              step={500}
              onChange={(value: number[]) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  kilometers: { min: value[0], max: value[1] },
                }))
              }
              renderThumb={(props, state) => (
                <div {...props} key={props.key}>
                  <p className="pt-4 text-sm">{state.valueNow}km</p>
                </div>
              )}
            />
          )}
          <p
            className="mt-6 mb-2 font-medium"
            onClick={() => toggleVisibility(setShowHorsepower)}
          >
            Potencia {showHorsepower ? " -" : " +"}
          </p>
          {showHorsepower && (
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="thumb"
              trackClassName="track"
              value={[
                selectedFilters.horsepower.min,
                selectedFilters.horsepower.max,
              ]}
              min={0}
              max={1000}
              step={50}
              onChange={(value: number[]) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  horsepower: { min: value[0], max: value[1] },
                }))
              }
              renderThumb={(props, state) => (
                <div {...props} key={props.key}>
                  <p className="pt-4 text-sm">{state.valueNow}cv</p>
                </div>
              )}
            />
          )}
          <p
            className="mt-6 mb-2 font-medium"
            onClick={() => toggleVisibility(setShowSeats)}
          >
            Asientos {showSeats ? " -" : " +"}
          </p>
          {showSeats && (
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="thumb"
              trackClassName="track"
              value={[selectedFilters.seats.min, selectedFilters.seats.max]}
              min={0}
              max={10}
              step={1}
              onChange={(value: number[]) =>
                setSelectedFilters((prev) => ({
                  ...prev,
                  seats: { min: value[0], max: value[1] },
                }))
              }
              renderThumb={(props, state) => (
                <div {...props} key={props.key}>
                  <p className="pt-4 text-sm">{state.valueNow}</p>
                </div>
              )}
            />
          )}
        </div>
        <div className="px-4 py-2 border-t flex justify-end space-x-2 mt-6">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
            onClick={clearFilters}
          >
            Limpiar filtros
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={applyFilters}
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
