import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../service/service.config";
import FormUploadEditCar from "../components/FormUploadEditCar";

const CarEdit: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const [carInfo, setCarInfo] = useState({
    brand: "",
    model: "",
    year: "",
    kilometers: "",
    price: "",
    fuelType: "",
    horsepower: "",
    seats: "",
    engine: "",
    transmission: "",
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await service.get(`/cars/${carId}`);
        setCarInfo(res.data);
      } catch (error) {
        console.error("Error al obtener información de los coches", error);
      }
    };
  }, [carId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarInfo((prevCarInfo) => ({
      ...prevCarInfo,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Editar coche</h1>
      <FormUploadEditCar
        carInfo={carInfo}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default CarEdit;
