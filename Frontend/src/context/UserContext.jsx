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
    titulo: "",
    precio: "",
    categorias: "",
    estado: "",
    descripcion: "",
  });

  const inputRefs = {
    nombre: useRef(null),
    rut: useRef(null),
    telefono: useRef(null),
    email: useRef(null),
    contraseña: useRef(null),
    confirmContraseña: useRef(null),
    titulo: useRef(null),
    precio: useRef(null),
    categorias: useRef(null),
    estado: useRef(null),
    descripcion: useRef(null),
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
        titulo: "",
        precio: "",
        categorias: "",
        estado: "",
        descripcion: "",
      });
      setInputFormError({
        errorNombre: "",
        errorRut: "",
        errorTelefono: "",
        errorEmail: "",
        errorContraseña: "",
        errorConfirmContraseña: "",
        errorTitulo: "",
        errorPrecio: "",
        errorCategorias: "",
        errorEstado: "",
        errorDescripcion: "",
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const [inputFormError, setInputFormError] = useState({
    errorNombre: "",
    errorRut: "",
    errorTelefono: "",
    errorEmail: "",
    errorContraseña: "",
    errorConfirmContraseña: "",
  });

  useEffect(() => {
    if (
      userData.nombre !== "" ||
      userData.rut !== "" ||
      userData.telefono !== "" ||
      userData.email !== "" ||
      userData.contraseña !== "" ||
      userData.confirmContraseña !== "" ||
      userData.titulo !== "" ||
      userData.precio !== "" ||
      userData.categorias !== "" ||
      userData.estado !== "" ||
      userData.descripcion !== ""
    ) {
      setInputFormError({
        errorNombre: "",
        errorRut: "",
        errorTelefono: "",
        errorEmail: "",
        errorContraseña: "",
        errorConfirmContraseña: "",
        errorTitulo: "",
        errorPrecio: "",
        errorCategorias: "",
        errorEstado: "",
        errorDescripcion: "",
      });
    }
  }, [userData]);

  useEffect(() => {
    // Función para determinar si se debe enfocar algún input
    const shouldFocusInput = () => {
      return (
        inputFormError.errorNombre ||
        inputFormError.errorRut ||
        inputFormError.errorTelefono ||
        inputFormError.errorEmail ||
        inputFormError.errorContraseña ||
        inputFormError.errorConfirmContraseña
      );
    };

    // Enfocar el input correspondiente si hay algún error
    if (shouldFocusInput()) {
      if (inputFormError.errorNombre) {
        inputRefs.nombre.current.focus();
      } else if (inputFormError.errorRut) {
        inputRefs.rut.current.focus();
      } else if (inputFormError.errorTelefono) {
        inputRefs.telefono.current.focus();
      } else if (inputFormError.errorEmail) {
        inputRefs.email.current.focus();
      } else if (inputFormError.errorContraseña) {
        inputRefs.contraseña.current.focus();
      } else if (inputFormError.errorConfirmContraseña) {
        inputRefs.confirmContraseña.current.focus();
      }
    }
  }, [inputFormError]);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
