import React from "react";

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSort: (criteria: string, order: string) => void; // Nuevo: agrega el orden
}

const SortModal: React.FC<SortModalProps> = ({ isOpen, onClose, onSort }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full mt-2 bg-white border rounded shadow-lg w-full z-50">
      <div className="px-4 py-2 border-b">
        <span className="font-bold">Ordenar por:</span>
      </div>

      {/* Precio */}
      <div className="px-4 py-2">
        <span className="block font-semibold">Precio</span>
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          onClick={() => {
            onSort("price", "asc"); // Precio ascendente
            onClose();
          }}
        >
          Menor a mayor
        </button>
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          onClick={() => {
            onSort("price", "desc"); // Precio descendente
            onClose();
          }}
        >
          Mayor a menor
        </button>
      </div>

      {/* Año */}
      <div className="px-4 py-2">
        <span className="block font-semibold">Año</span>
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          onClick={() => {
            onSort("year", "asc"); // Año ascendente
            onClose();
          }}
        >
          Menor a mayor
        </button>
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          onClick={() => {
            onSort("year", "desc"); // Año descendente
            onClose();
          }}
        >
          Mayor a menor
        </button>
      </div>

      {/* Kilómetros */}
      <div className="px-4 py-2">
        <span className="block font-semibold">Kilómetros</span>
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          onClick={() => {
            onSort("kilometers", "asc"); // Kilómetros ascendente
            onClose();
          }}
        >
          Menor a mayor
        </button>
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          onClick={() => {
            onSort("kilometers", "desc"); // Kilómetros descendente
            onClose();
          }}
        >
          Mayor a menor
        </button>
      </div>
    </div>
  );
};

export default SortModal;
