import React from "react";
import { FooterSocialMedia, FooterLinks, FooterUbi } from "../../components";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <FooterLinks />
        <FooterUbi />
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Síguenos en redes sociales
          </h2>
          <FooterSocialMedia />
          <p className="text-sm text-gray-400">
            &copy; 2024 ImportautoElche.com. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
