import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-b border-gray-300">
      <div className="mx-auto flex justify-between items-center ">
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

        <img src={logo} alt="Logo" className="w-32 h-20" />

        <div className="hidden sm:flex space-x-12 font-bold">
          <Link to="/" className="hover:bg-red-500 hover:text-white rounded">
            Inicio
          </Link>
          <Link
            to="/coches"
            className="hover:bg-red-500 hover:text-white rounded"
          >
            Nuestros Coches
          </Link>
          <Link
            to="/sobre-nosotros"
            className="hover:bg-red-500 hover:text-white rounded"
          >
            Sobre nosotros
          </Link>
          <Link
            to="/por-que-importauto"
            className="hover:bg-red-500 hover:text-white rounded"
          >
            ¿Por qué importauto?
          </Link>
        </div>

        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="20"
            height="20"
            className="mr-3"
          >
            <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width="20"
            height="20"
            className="mr-3 hidden sm:block"
          >
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="20"
            height="20"
            className="mr-3"
          >
            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="20"
            height="20"
            className="mr-3 hidden sm:block"
          >
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-red-600 rounded hover:text-white"
          >
            Inicio
          </Link>
          <Link
            to="/coches"
            className="block px-4 py-2 hover:bg-red-600 rounded hover:text-white"
          >
            Nuestros Coches
          </Link>
          <Link
            to="/sobre-nosotros"
            className="block px-4 py-2 hover:bg-red-600 rounded hover:text-white"
          >
            Sobre nosotros
          </Link>
          <Link
            to="/por-que-importauto"
            className="block px-4 py-2 hover:bg-red-600 rounded hover:text-white"
          >
            ¿Por qué Importauto?
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
