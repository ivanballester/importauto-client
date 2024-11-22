import { createContext, useEffect, useState } from "react";
import service from "../service/service.config";

const AuthContext = createContext<any>(null);

const AuthProviderWrapper = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const authenticateUser = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setIsLoading(false);
      setIsLogged(false);
      setIsAdmin(false);
      setUser(null);
      return;
    }

    try {
      const response = await service.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setIsLoading(false);
      setIsLogged(true);
      setUser(response.data);

      if (response.data.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsLogged(false);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsLogged(false);
  };
  const passedContextValue = {
    isAdmin,
    isLogged,
    user,
    authenticateUser,
    logoutUser,
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  if (isLoading) {
    return <p>Validando credenciales...</p>;
  }
  console.log(user, isAdmin, isLogged);
  return (
    <AuthContext.Provider value={passedContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
