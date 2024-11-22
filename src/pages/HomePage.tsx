import React, { useEffect, useState } from "react";
import service from "../service/service.config";
import axios from "axios";

const HomePage: React.FC = () => {
  const [latestCar, setLatestCar] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  useEffect(() => {
    fetchCars();

    fetchNews();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await service.get("/cars");
      const cars = response.data;

      if (cars.length > 0) {
        setLatestCar(cars[cars.length - 1]);
      }
    } catch (error) {
      console.error("Error al obtener los coches:", error);
    }
  };
  const fetchNews = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          // country: "es",
          // category: "technology",
          q: `"auto" OR "coche" OR "coches"`,
          language: "es",
          apiKey: "6246b6b821dd4e0f82e09ccdea064d06",
        },
      });
      console.log(response.data);
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error al obtener noticias:", error);
    }
  };

  const handleLoadMoreNews = () => {
    setVisibleNewsCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="bg-rojo text-white text-center py-16">
        <h1 className="text-4xl font-bold">Bienvenidos a ImportAutoElche</h1>
        <p className="mt-4 text-lg text-center">
          Descubre nuestras últimas adquisiciones y noticias del mundo del
          motor.
        </p>
      </header>

      {/* Última Adquisición */}
      <section className="latest-car bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Nuevo en la familia</h2>
          {latestCar ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src={latestCar.imageUrls[0]}
                alt={latestCar.brand}
                className="w-full  h-full object-cover rounded-md"
              />
              <h3 className="text-2xl font-bold mt-4">
                {latestCar.brand} {latestCar.model}
              </h3>

              <p className="text-yellow-600 font-bold mt-4">
                {latestCar.price} €
              </p>
              <button className="mt-6 px-4 py-2 bg-rojo text-white rounded">
                Ver más detalles
              </button>
            </div>
          ) : (
            <p>Cargando última adquisición...</p>
          )}
        </div>
      </section>

      {/* Centro de Noticias */}
      <section className="news py-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            Noticias y Curiosidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.length > 0 ? (
              news.slice(0, visibleNewsCount).map((article, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{article.title}</h3>
                    <p className="text-gray-600 mt-2">
                      {article.description?.substring(0, 100)}...
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rojo font-bold mt-4 block"
                    >
                      Leer más
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>Cargando noticias...</p>
            )}
          </div>
          {visibleNewsCount < news.length && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMoreNews}
                className="px-6 py-2 bg-rojo text-white rounded hover:bg-blue-700"
              >
                Ver más noticias
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Servicios */}
      <section className="services bg-gray-200 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Nuestros Servicios</h2>
          <p className="text-gray-600">
            Ofrecemos compraventa de vehículos, revisiones técnicas y servicios
            de reparación para tu coche.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
