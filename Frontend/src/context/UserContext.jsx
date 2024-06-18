import { createContext, useState } from "react";

//Creación de un token de prueba para acceder a las rutas privadas
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userToken, setUserToken] = useState("");

  return (
    <UserContext.Provider value={{ userToken }}>
      {children}
    </UserContext.Provider>
  );
}
