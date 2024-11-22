import React, { useState } from "react";
import service from "../service/service.config";
import { Link } from "react-router-dom";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await service.post("/contact-mail", formData);

      if (response.status === 200) {
        setStatus(null); // Limpia el mensaje de error
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setIsModalOpen(true); // Abre el modal
      } else {
        setStatus("Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      setStatus("Hubo un error al enviar el mensaje.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Formulario de Contacto
      </h2>
      {status && <p className="text-center text-red-600">{status}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Mensaje</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enviar mensaje
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">¡Mensaje enviado!</h3>
            <p className="mb-4">Tu mensaje ha sido enviado correctamente.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Link to="/coches">Volver</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
