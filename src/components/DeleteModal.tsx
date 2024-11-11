interface DeleteModalProps {
  carId: string;
  closeModal: () => void;
  onDelete: (carId: string) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  carId,
  closeModal,
  onDelete,
}) => {
  const handleConfirmDelete = () => {
    onDelete(carId);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          ¿Estás seguro de eliminar este coche?
        </h2>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={handleConfirmDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
