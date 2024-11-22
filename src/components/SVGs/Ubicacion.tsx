import React, { useState } from "react";

const Ubicacion: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRedirect = () => {
    window.location.href =
      "https://www.google.de/maps/place/Import+Auto+Elche/@38.2945555,-0.732873,20z/data=!4m15!1m8!3m7!1s0xd63b7ef08981701:0x93c0e118f214118d!2sPartida+Carrus,+03205,+Alicante!3b1!8m2!3d38.2973112!4d-0.742722!16s%2Fg%2F11qgbv8b7q!3m5!1s0xd63b7c06a12991b:0xb786f5bd0519982e!8m2!3d38.2944853!4d-0.7328577!16s%2Fg%2F11wc2_jv3q?entry=ttu&g_ep=EgoyMDI0MTExOC4wIKXMDSoASAFQAw%3D%3D";
  };

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        width="20"
        height="20"
        className="mr-3 hidden sm:block cursor-pointer"
        onClick={handleIconClick}
      >
        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
      </svg>

      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center z-60">
            <h3 className="mb-4">
              ¿Quieres salir de la web y abrir Google Maps?
            </h3>
            <div>
              <button
                onClick={handleRedirect}
                className="mr-2 px-4 py-2 bg-rojo text-white rounded"
              >
                Sí
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ubicacion;
