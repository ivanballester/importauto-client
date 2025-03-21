// components/CarCard.tsx
import React from "react";
import CarCarousel from "./CarCarousel";
import CarPrice from "./CarPrice";
import CarDeleteAction from "./CarDeleteAction";

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
  handleDeleteCar: (carId: string) => void;
}

const CarCard: React.FC<Car> = ({
  _id,
  brand,
  model,
  year,
  price,
  horsepower,
  fuelType,
  engine,
  kilometers,
  transmission,
  imageUrls,
  handleDeleteCar,
}) => {
  return (
    <div className="m-4 shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300">
      <div className="relative w-full h-64">
        <CarCarousel imageUrls={imageUrls} />
      </div>

      <div className="flex justify-between pb-4">
        <div className="pl-1">
          <h1 className="text-md font-bold">
            {brand} {model}
          </h1>
          <p className="text-sm">
            {engine} - {transmission}
          </p>
          <p className="text-sm">
            {year} | {kilometers}km | {horsepower}CV | {fuelType}
          </p>
        </div>
        <div className="pr-1">
          <CarPrice price={price} />
          <div className="flex justify-around mt-2">
            <CarDeleteAction carId={_id} onDelete={handleDeleteCar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
