import React, { useState } from "react";
// import Delete from "./SVGs/Delete";
// import DeleteModal from "./DeleteModal";
import { Delete, DeleteModal } from "../components";

interface CarDeleteProps {
  carId: string;
  onDelete: (id: string) => void;
}

const CarDelete: React.FC<CarDeleteProps> = ({ carId, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Delete handleDeleteClick={handleDeleteClick} />

      {isModalOpen && (
        <DeleteModal
          carId={carId}
          closeModal={closeModal}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default CarDelete;
