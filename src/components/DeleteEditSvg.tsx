import { useState } from "react";
import DeleteModal from "./DeleteModal";

interface DeleteEditSvgProps {
  carId: string;
  onDelete: (id: string) => void;
}

const DeleteEditSvg: React.FC<DeleteEditSvgProps> = ({ carId, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-around mt-2">
        <svg
          fill="#000000"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 inline-block cursor-pointer"
          onClick={handleDeleteClick}
        >
          <path d="M831.24 280.772c5.657 0 10.24-4.583 10.24-10.24v-83.528c0-5.657-4.583-10.24-10.24-10.24H194.558a10.238 10.238 0 00-10.24 10.24v83.528c0 5.657 4.583 10.24 10.24 10.24H831.24zm0 40.96H194.558c-28.278 0-51.2-22.922-51.2-51.2v-83.528c0-28.278 22.922-51.2 51.2-51.2H831.24c28.278 0 51.2 22.922 51.2 51.2v83.528c0 28.278-22.922 51.2-51.2 51.2z"></path>
          <path d="M806.809 304.688l-58.245 666.45c-.544 6.246-6.714 11.9-12.99 11.9H290.226c-6.276 0-12.447-5.654-12.99-11.893L218.99 304.688c-.985-11.268-10.917-19.604-22.185-18.619s-19.604 10.917-18.619 22.185l58.245 666.45c2.385 27.401 26.278 49.294 53.795 49.294h445.348c27.517 0 51.41-21.893 53.796-49.301l58.244-666.443c.985-11.268-7.351-21.201-18.619-22.185s-21.201 7.351-22.185 18.619zM422.02 155.082V51.3c0-5.726 4.601-10.342 10.24-10.342h161.28c5.639 0 10.24 4.617 10.24 10.342v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V51.3c0-28.316-22.908-51.302-51.2-51.302H432.26c-28.291 0-51.2 22.986-51.2 51.302v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z"></path>
        </svg>
      </div>

      {isModalOpen && (
        <DeleteModal
          carId={carId}
          closeModal={closeModal}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default DeleteEditSvg;
