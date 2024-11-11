import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";
import CarsPage from "./pages/CarsPage";
import AboutPage from "./pages/AboutPage";
import WhyPage from "./pages/WhyPage";
import CarUpload from "./pages/CarUpload";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coches" element={<CarsPage />} />
        <Route path="/sobre-nosotros" element={<AboutPage />} />
        <Route path="/por-que-importauto" element={<WhyPage />} />
        <Route path="/nuevo-coche" element={<CarUpload />} />
      </Routes>
    </div>
  );
}

export default App;
