import FilterBar from "../components/FilterBar";
import { useState, useEffect } from "react";
import service from "../service/service.config";
import placeholder from "../assets/carplaceholder.png";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const fetchCars = async () => {
    try {
      const res = await service.get("/cars");
      setCars(res.data);
      console.log(res);
    } catch (error) {
      setError("Error al obtener información de los coches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const openModal = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedCar(null); // Limpia el coche seleccionado
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
      <div>
        {cars.map((car) => (
          <div
            key={car._id}
            className="m-4 shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300"
          >
            <img
              src={car.imageUrls[0] || placeholder}
              alt={car.brand}
              onError={(e) => (e.currentTarget.src = placeholder)}
              style={{ width: "100%", height: "auto" }}
              className="rounded-t-lg cursor-pointer"
              onClick={() => openModal(car)}
            />
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
              </div>
            </div>
          </div>
        ))}

        {/* Modal */}
        {isModalOpen && selectedCar && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4">
                {selectedCar.brand} {selectedCar.model}
              </h2>
              <ul className="space-y-2">
                <li>
                  <strong>Año:</strong> {selectedCar.year}
                </li>
                <li>
                  <strong>Combustible:</strong> {selectedCar.fuelType}
                </li>
                <li>
                  <strong>CV:</strong> {selectedCar.horsepower}
                </li>
                <li>
                  <strong>Kilometraje:</strong> {selectedCar.kilometers}
                </li>
                <li>
                  <strong>Transmisión:</strong> {selectedCar.transmission}
                </li>
                <li>
                  <strong>Motor:</strong> {selectedCar.engine}
                </li>
                <li>
                  <strong>Asientos:</strong> {selectedCar.seats}
                </li>
                <li>
                  <strong>Precio:</strong>{" "}
                  {selectedCar.price.toLocaleString("es-ES")}€
                </li>
              </ul>
              <button
                className="mt-4 bg-rojo text-white rounded px-4 py-2"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarsPage;
