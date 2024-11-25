import React, { useState, useContext } from "react";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import {
  BurguerMenu,
  Telefono,
  Contacto,
  Perfil,
  Ubicacion,
  NavbarLinks,
} from "../../components";

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
    <nav className="border-b border-gray-300 max-w-screen-xl mx-auto">
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
          onClick={() => navigate("/")}
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
