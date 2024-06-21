import { createContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  direccion: "",
  region: "",
  comuna: "",
  codigoPostal: "",
  numero: "",
  tipo: "",
  numeroTarjeta: "",
  expiracion: "",
  cvv: "",
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
  errorDireccion: "",
  errorRegion: "",
  errorComuna: "",
  errorCodigoPostal: "",
  errorNumero: "",
  errorTipo: "",
  errorNumeroTarjeta: "",
  errorExpiracion: "",
  errorCvv: "",
};

const initialStateToken = localStorage.getItem("token") || null;
const initialStateUser = JSON.parse(localStorage.getItem("user")) || null;

export function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(initialStateToken);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const rutFormatRegex = /^[0-9]+-[0-9]$/;
  const onlyNumbersRegex = /^[0-9]+$/;
  const [userData, setUserData] = useState(initialUserData);
  const [user, setUser] = useState(initialStateUser);
  const [userAddress, setUserAddress] = useState("");
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
    direccion: useRef(null),
    region: useRef(null),
    comuna: useRef(null),
    codigoPostal: useRef(null),
    numero: useRef(null),
    tipo: useRef(null),
    numeroTarjeta: useRef(null),
    expiracion: useRef(null),
    cvv: useRef(null),
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

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("token", userToken);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [userToken, user]);

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
        userAddress,
        setUserAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
