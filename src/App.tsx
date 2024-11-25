import Navbar from "./components/Layout/Navbar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";
import CarsPage from "./pages/CarsPage";
import AboutPage from "./pages/AboutPage";
import WhyPage from "./pages/WhyPage";
import CarUploadPage from "./pages/CarUploadPage";
import CarEditPage from "./pages/CarEditPage";
import Footer from "./components/Layout/Footer";
import FormContactPage from "./pages/FormContactPage";
import Login from "./pages/Auth/Login";
import Admin from "./components/Auth/Admin";

function App() {
  return (
    <div className=" mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coches" element={<CarsPage />} />
        <Route path="/sobre-nosotros" element={<AboutPage />} />
        <Route path="/por-que-importauto" element={<WhyPage />} />
        <Route
          path="/nuevo-coche"
          element={
            <Admin>
              <CarUploadPage />
            </Admin>
          }
        />
        <Route path="/editar-coche/:carId" element={<CarEditPage />} />
        <Route path="/contacto" element={<FormContactPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
