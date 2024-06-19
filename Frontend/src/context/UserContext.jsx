import { createContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Creación de un token de prueba para acceder a las rutas privadas
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userToken, setUserToken] = useState("Hola soy el token");
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const rutFormatRegex = /^[0-9]+-[0-9]$/;
  const onlyNumbersRegex = /^[0-9]+$/;
  const [userData, setUserData] = useState({
    nombre: "",
    rut: "",
    telefono: "",
    email: "",
    contraseña: "",
    confirmContraseña: "",
  });

  const inputRefs = {
    nombre: useRef(null),
    rut: useRef(null),
    telefono: useRef(null),
    email: useRef(null),
    contraseña: useRef(null),
    confirmContraseña: useRef(null),
  };

  useEffect(() => {
    if (navigate) {
      setUserData({
        nombre: "",
        rut: "",
        telefono: "",
        email: "",
        contraseña: "",
        confirmContraseña: "",
      });
    }
  }, [navigate, setUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <UserContext.Provider
      value={{
        userToken,
        emailRegex,
        rutFormatRegex,
        onlyNumbersRegex,
        userData,
        setUserData,
        inputRefs,
        handleChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
