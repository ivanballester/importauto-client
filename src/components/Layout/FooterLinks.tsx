import { Link } from "react-router-dom";

function FooterLinks() {
  return (
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
          <Link to="/contacto" className="hover:text-white">
            Contacto
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-white">
            Iniciar sesion
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FooterLinks;
