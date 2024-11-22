import React, { useState, useContext } from "react";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import BurguerMenu from "../SVGs/BurguerMenu";
import Telefono from "../SVGs/Telefono";
import Contacto from "../SVGs/Contacto";
import Perfil from "../SVGs/Perfil";
import Ubicacion from "../SVGs/Ubicacion";
import NavbarLinks from "./NavbarLinks";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <nav className="border-b border-gray-300">
      <div className="mx-auto flex justify-between items-center ">
        <button
          onClick={toggleMenu}
          className="sm:hidden  focus:outline-none"
          aria-label="Toggle menu"
        >
          <BurguerMenu />
        </button>

        <img
          src={logo}
          alt="Logo"
          className="w-32 h-20"
          onClick={() => navigate("/coches")}
        />

        <div className="hidden sm:flex space-x-12 font-bold">
          <NavbarLinks setIsOpen={setIsOpen} isAdmin={isAdmin} />
        </div>

        <div
          className="flex"
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          <Telefono />
          <Contacto />
          <Perfil />
          <Ubicacion />
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4">
          <NavbarLinks setIsOpen={setIsOpen} isAdmin={isAdmin} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
