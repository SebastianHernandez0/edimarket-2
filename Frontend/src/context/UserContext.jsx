import { createContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Creación de un token de prueba para acceder a las rutas privadas
export const UserContext = createContext();

const initialUserData = {
  nombre: "",
  email: "",
  contraseña: "",
  confirmContraseña: "",
  titulo: "",
  precio: "",
  categorias: "",
  estado: "",
  descripcion: "",
};

const initialFormError = {
  errorNombre: "",
  errorEmail: "",
  errorContraseña: "",
  errorConfirmContraseña: "",
  errorTitulo: "",
  errorPrecio: "",
  errorCategorias: "",
  errorEstado: "",
  errorDescripcion: "",
};

const initialStateToken = localStorage.getItem("token") || null;

export function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(initialStateToken);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const rutFormatRegex = /^[0-9]+-[0-9]$/;
  const onlyNumbersRegex = /^[0-9]+$/;
  const [userData, setUserData] = useState(initialUserData);
  const [user, setUser] = useState([]);
  const [inputFormError, setInputFormError] = useState(initialFormError);

  const inputRefs = {
    nombre: useRef(null),
    email: useRef(null),
    contraseña: useRef(null),
    confirmContraseña: useRef(null),
    titulo: useRef(null),
    precio: useRef(null),
    categorias: useRef(null),
    estado: useRef(null),
    descripcion: useRef(null),
  };

  // Resetear el estado si cambia la navegación (URL)
  useEffect(() => {
    setUserData(initialUserData);
    setInputFormError(initialFormError);
  }, [navigate]);

  //Manejo de datos ingresados en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // Resetear los errores si userData cambia
  useEffect(() => {
    setInputFormError(initialFormError);
  }, [userData]);

  // Enfocar el primer input con algún error
  useEffect(() => {
    const shouldFocusInput = Object.keys(inputFormError).some(
      (key) => inputFormError[key]
    );

    if (shouldFocusInput) {
      Object.keys(inputRefs).forEach((key) => {
        if (
          inputFormError[`error${key.charAt(0).toUpperCase() + key.slice(1)}`]
        ) {
          inputRefs[key].current.focus();
        }
      });
    }
  }, [inputFormError]);

  const logout = () => {
    setUserToken(null);
    navigate("/");
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
        inputFormError,
        setInputFormError,
        user,
        setUser,
        setUserToken,
        initialUserData,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
