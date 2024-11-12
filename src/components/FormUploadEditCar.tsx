interface CarInfoProps {
  carInfo: {
    model: string;
    brand: string;
    year: string;
    kilometers: string;
    price: string;
    fuelType: string;
    horsepower: string;
    seats: string;
    engine: string;
    transmission: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormUploadEditCar: React.FC<CarInfoProps> = ({
  carInfo,
  handleInputChange,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700"
          >
            Modelo
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={carInfo.model}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Marca
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={carInfo.brand}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Año
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={carInfo.year}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="kilometers"
            className="block text-sm font-medium text-gray-700"
          >
            Kilómetros
          </label>
          <input
            type="number"
            id="kilometers"
            name="kilometers"
            value={carInfo.kilometers}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={carInfo.price}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="fuelType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de combustible
          </label>
          <input
            type="text"
            id="fuelType"
            name="fuelType"
            value={carInfo.fuelType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="horsepower"
            className="block text-sm font-medium text-gray-700"
          >
            Caballos
          </label>
          <input
            type="number"
            id="horsepower"
            name="horsepower"
            value={carInfo.horsepower}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="seats"
            className="block text-sm font-medium text-gray-700"
          >
            Nº de asientos
          </label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={carInfo.seats}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="engine"
            className="block text-sm font-medium text-gray-700"
          >
            Motor
          </label>
          <input
            type="text"
            id="engine"
            name="engine"
            value={carInfo.engine}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="transmission"
            className="block text-sm font-medium text-gray-700"
          >
            Transmisión
          </label>
          <input
            type="text"
            id="transmission"
            name="transmission"
            value={carInfo.transmission}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
      </div>
    </form>
  );
};

export default FormUploadEditCar;
