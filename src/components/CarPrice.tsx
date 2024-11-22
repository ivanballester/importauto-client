// components/CarPrice.tsx
import React from "react";

interface CarPriceProps {
  price: number;
}

const CarPrice: React.FC<CarPriceProps> = ({ price }) => (
  <div>
    <p className="text-sm line-through">
      {(price * 1.15).toLocaleString("es-ES")}€
    </p>
    <p className="text-md font-bold bg-red-600 rounded-lg text-white">
      {price.toLocaleString("es-ES")}€
    </p>
  </div>
);

export default CarPrice;
