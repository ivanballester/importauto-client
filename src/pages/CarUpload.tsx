import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import service from "../service/service.config";
import { useNavigate } from "react-router-dom";
import FormUploadEditCar from "../components/FormUploadEditCar";

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

  const navigate = useNavigate();

  const onDrop = (acceptedFiles: File[]) => {
    setImages(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
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

      if (!isUploading) {
        navigate("/coches");
      }
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
      <h2 className="text-2xl font-bold mb-6 text-center">
        Subir Información del Coche
      </h2>

      {/* Información del coche */}

      <FormUploadEditCar
        carInfo={carInfo}
        handleInputChange={handleInputChange}
      />

      <div
        {...getRootProps()}
        className={`mt-4 border-2 p-6 text-center cursor-pointer ${
          isDragActive ? "border-blue-500" : "border-dashed border-gray-300"
        }`}
      >
        <input {...getInputProps()} style={{ display: "none" }} />
        <p className="text-gray-500">
          {isDragActive
            ? "Suelta las imágenes aquí..."
            : "Arrastra o haz clic para seleccionar imágenes"}
        </p>
      </div>

      <div className="text-center">
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
          className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 text-center"
        >
          {isUploading ? "Subiendo..." : "Subir Información"}
        </button>
      </div>
    </form>
  );
};

export default CarUploadForm;
