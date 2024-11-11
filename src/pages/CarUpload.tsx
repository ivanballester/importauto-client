import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import service from "../service/service.config";

const CarUploadForm: React.FC = () => {
  const [carInfo, setCarInfo] = useState({
    model: "",
    brand: "",
    year: "",
    kilometers: "",
    price: "",
    fuelType: "",
    horsepower: "",
    seats: "",
    engine: "",
    transmission: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    setImages(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as string,
    multiple: true,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCarInfo({ ...carInfo, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (images.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      // Agregar la información del coche al FormData
      Object.keys(carInfo).forEach((key) => {
        formData.append(key, carInfo[key as keyof typeof carInfo]);
      });

      const response = await service.post("/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // Manejar la respuesta
    } catch (error) {
      console.error("Error uploading car data:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Subir Información del Coche</h2>

      {/* Información del coche */}
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

      {/* Carga de imágenes */}
      <div
        className="mt-4 border-dashed border-2 p-6 text-center cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          Arrastra las imágenes aquí o haz clic para seleccionarlas
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-4">
          <h4>Imágenes seleccionadas:</h4>
          <ul>
            {images.map((image, index) => (
              <li key={index}>{image.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        disabled={isUploading}
        className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {isUploading ? "Subiendo..." : "Subir Información"}
      </button>
    </form>
  );
};

export default CarUploadForm;
