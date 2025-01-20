import React from "react";
import { CarDelete, Edit, Admin } from "../components";

interface CarDeleteActionProps {
  carId: string;
  onDelete: (carId: string) => void;
}

const CarDeleteAction: React.FC<CarDeleteActionProps> = ({
  carId,
  onDelete,
}) => {
  return (
    <Admin>
      <div className="flex gap-3">
        <CarDelete carId={carId} onDelete={onDelete} />

        <Edit carId={carId} />
      </div>
    </Admin>
  );
};

export default CarDeleteAction;
