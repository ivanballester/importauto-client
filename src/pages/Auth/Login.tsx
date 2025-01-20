import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import service from "../../service/service.config";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { authenticateUser, isLogged, logoutUser } = useContext(AuthContext);
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userCredentials = { email: user.email, password: user.password };

    try {
      const response = await service.post("/auth/login", userCredentials);
      localStorage.setItem("authToken", response.data.authToken);
      console.log(response);
      authenticateUser();
      navigate("/");
    } catch (error) {
      setError("Error al iniciar sesion");
      console.log(error);
    }
  };

  return (
    <div className="m-12">
      {isLogged ? (
        <div className="text-center">
          <p>Ya estás registrado</p>
          <button
            onClick={logoutUser}
            className="bg-red-500 text-white p-2 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center ">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-4 text-center border border-gray-300 rounded-md p-2"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="mb-4 text-center border border-gray-300 rounded-md p-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Iniciar sesión
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
