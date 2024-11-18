import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";
import CarsPage from "./pages/CarsPage";
import AboutPage from "./pages/AboutPage";
import WhyPage from "./pages/WhyPage";
import CarUploadPage from "./pages/CarUploadPage";
import CarEditPage from "./pages/CarEditPage";
import Footer from "./components/Footer";
import FormContactPage from "./pages/FormContactPage";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coches" element={<CarsPage />} />
        <Route path="/sobre-nosotros" element={<AboutPage />} />
        <Route path="/por-que-importauto" element={<WhyPage />} />
        <Route path="/nuevo-coche" element={<CarUploadPage />} />
        <Route path="/editar-coche/:carId" element={<CarEditPage />} />
        <Route path="/contacto" element={<FormContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
