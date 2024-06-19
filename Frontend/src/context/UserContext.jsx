import { createContext, useState } from "react";

//Creación de un token de prueba para acceder a las rutas privadas
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userToken, setUserToken] = useState("Hola soy el token");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const rutFormatRegex = /^[0-9]+-[0-9]$/;
  const onlyNumbersRegex = /^[0-9]+$/;

  return (
    <UserContext.Provider
      value={{ userToken, emailRegex, rutFormatRegex, onlyNumbersRegex }}
    >
      {children}
    </UserContext.Provider>
  );
}
