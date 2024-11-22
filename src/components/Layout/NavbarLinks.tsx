import React from "react";
import { Link } from "react-router-dom";

interface NavbarLinksProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ setIsOpen, isAdmin }) => {
  return (
    <>
      <Link
        to="/"
        className="block px-4 py-2 hover:bg-rojo rounded hover:text-white"
        onClick={() => setIsOpen(false)}
      >
        Inicio
      </Link>
      <Link
        to="/coches"
        className="block px-4 py-2 hover:bg-rojo rounded hover:text-white"
        onClick={() => setIsOpen(false)}
      >
        Nuestros Coches
      </Link>
      <Link
        to="/sobre-nosotros"
        className="block px-4 py-2 hover:bg-rojo rounded hover:text-white"
        onClick={() => setIsOpen(false)}
      >
        Sobre nosotros
      </Link>

      {isAdmin && (
        <Link
          to="/nuevo-coche"
          className="block px-4 py-2 hover:bg-rojo rounded hover:text-white font-bold underline"
          onClick={() => setIsOpen(false)}
        >
          Subir coche
        </Link>
      )}
    </>
  );
};

export default NavbarLinks;
