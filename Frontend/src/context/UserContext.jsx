import { createContext, useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";

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
  nombreTitular: "",
  expiracion: "",
  cvv: "",
  postimg: "",
  productStock: "",
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
  errorNombreTitular: "",
  errorExpiracion: "",
  errorCvv: "",
  errorPostimg: "",
  errorProductStock: "",
};

const initialStateToken = localStorage.getItem("token") || null;
const initialStateUser = JSON.parse(localStorage.getItem("user")) || null;

export function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(initialStateToken);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const rutFormatRegex = /^[0-9]+-[0-9]$/;
  const onlyNumbersRegex = /^[0-9]+$/;
  const image_url_regex = /\bhttps?:\/\/\S+\.(?:png|jpe?g|gif|webp)\b/;
  const [userData, setUserData] = useState(initialUserData);
  const [user, setUser] = useState(initialStateUser);
  const [userAddress, setUserAddress] = useState("");
  const [userCreditCards, setUserCreditCards] = useState([]);
  const [inputFormError, setInputFormError] = useState(initialFormError);
  const { setLoading, setAddedToFav, addedToFav, setProductAlert } =
    useContext(ProductContext);

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
    nombreTitular: useRef(null),
    expiracion: useRef(null),
    cvv: useRef(null),
    postimg: useRef(null),
    productStock: useRef(null),
    timeoutRef: useRef(null),
  };

  const handleGetFavs = async () => {
    try {
      const response = await fetch("http://localhost:3000/favoritos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener favoritos");
      }

      const data = await response.json();
      setAddedToFav(data.favoritos);
      return data;
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFav = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:3000/favoritos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          usuario_id: addedToFav.usuario_id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar favorito");
      }

      const data = await response.json();
      handleGetFavs();
      setProductAlert((prevState) => ({
        ...prevState,
        success: "",
        errorFav: "Producto eliminado de favoritos.",
      }));

      inputRefs.timeoutRef.current = setTimeout(() => {
        setProductAlert((prevState) => ({
          ...prevState,
          errorFav: "",
        }));
        inputRefs.timeoutRef.current = null;
      }, 2400);

      return data;
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      handleGetFavs();
    }
    if (!userToken) {
      setAddedToFav([]);
    }
  }, [userToken]);

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
      [name]:
        name === "precio" || name === "productStock" ? Number(value) : value,
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
        userCreditCards,
        setUserCreditCards,
        image_url_regex,
        handleGetFavs,
        handleDeleteFav,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
