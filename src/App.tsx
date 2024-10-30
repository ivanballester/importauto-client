import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
