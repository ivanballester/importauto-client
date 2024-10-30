import React, { useState } from "react";
import logo from "../assets/logo1.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-6">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logo} alt="Logo" className="w-40 " />

        <div className="hidden sm:flex space-x-12">
          <a href="#" className="hover:bg-blue-500 hover:text-white rounded">
            Inicio
          </a>
          <a href="#" className="hover:bg-blue-500 hover:text-white rounded">
            Servicios
          </a>
          <a href="#" className="hover:bg-blue-500 hover:text-white rounded">
            Nosotros
          </a>
          <a href="#" className="hover:bg-blue-500 hover:text-white rounded">
            Contacto
          </a>
        </div>

        <button
          onClick={toggleMenu}
          className="sm:hidden  focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4">
          <a href="#" className="block px-4 py-2 hover:bg-blue-600 rounded">
            Inicio
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-blue-600 rounded">
            Servicios
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-blue-600 rounded">
            Nosotros
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-blue-600 rounded">
            Contacto
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
