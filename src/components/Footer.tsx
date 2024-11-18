import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {/* Sección de enlaces */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Enlaces</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/coches" className="hover:text-white">
                Nuestros coches
              </Link>
            </li>
            <li>
              <Link to="/sobre-nosotros" className="hover:text-white">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link to="/por-que-importauto" className="hover:text-white">
                ¿Por qué Importauto?
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección del mapa */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Ubicación</h2>
          <div className="h-48 rounded overflow-hidden">
            <MapContainer
              center={[38.26993, -0.70554]}
              zoom={15}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[38.26993, -0.70554]}>
                <Popup>
                  Importauto Elche <br /> Ven a visitarnos.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Síguenos en redes sociales
          </h2>
          <div className="flex space-x-4 mb-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-gray-300 hover:text-pink-500"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.328 3.608 1.303.975.975 1.241 2.242 1.303 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.328 2.633-1.303 3.608-.975.975-2.242 1.241-3.608 1.303-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.328-3.608-1.303-.975-.975-1.241-2.242-1.303-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.328-2.633 1.303-3.608C4.517 2.491 5.784 2.225 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.737 0 8.332.014 7.052.072 5.78.13 4.577.374 3.608 1.343 2.639 2.312 2.395 3.515 2.337 4.788.014 8.332 0 8.737 0 12s.014 3.668.072 4.948c.058 1.266.302 2.469 1.271 3.438.969.969 2.172 1.213 3.438 1.271C8.332 23.986 8.737 24 12 24s3.668-.014 4.948-.072c1.266-.058 2.469-.302 3.438-1.271.969-.969 1.213-2.172 1.271-3.438.058-1.266.072-1.671.072-4.948s-.014-3.668-.072-4.948c-.058-1.266-.302-2.469-1.271-3.438-.969-.969-2.172-1.213-3.438-1.271C15.668.014 15.263 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.838 3.838 0 110-7.676 3.838 3.838 0 010 7.676zm4.406-10.845a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-gray-300 hover:text-blue-500"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.293H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.785 4.659-4.785 1.325 0 2.463.099 2.793.143v3.24h-1.918c-1.505 0-1.797.714-1.797 1.763v2.311h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-400">
            &copy; 2024 ImportautoElche.com. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
