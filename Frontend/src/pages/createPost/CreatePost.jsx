import "../createPost/createPost.css";
import { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdImages } from "react-icons/io";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";

export function CreatePost() {
  const inputRefs = {
    titulo: useRef(null),
    precio: useRef(null),
    categorias: useRef(null),
    estado: useRef(null),
    descripcion: useRef(null),
  };

  const [createPostSuccess, setCreatePostSuccess] = useState("");

  const [userData, setUserData] = useState({
    titulo: "",
    precio: "",
    categorias: "",
    estado: "",
    descripcion: "",
  });

  const [createPostError, setCreatePostError] = useState({
    errorTitulo: "",
    errorPrecio: "",
    errorCategorias: "",
    errorEstado: "",
    errorDescripcion: "",
  });

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    setCreatePostError({
      errorTitulo: "",
      errorPrecio: "",
      errorCategorias: "",
      errorEstado: "",
      errorDescripcion: "",
    });

    if (userData.titulo.trim() === "") {
      setCreatePostError((prevErrors) => ({
        ...prevErrors,
        errorTitulo: "Pon un título a tu producto.",
      }));
    } else if (userData.precio.trim() === "") {
      setCreatePostError((prevErrors) => ({
        ...prevErrors,
        errorPrecio: "Pon un precio a tu producto.",
      }));
    } else if (userData.categorias === "") {
      setCreatePostError((prevErrors) => ({
        ...prevErrors,
        errorCategorias: "Selecciona una categoria.",
      }));
    } else if (userData.estado.trim() === "") {
      setCreatePostError((prevErrors) => ({
        ...prevErrors,
        errorEstado: "Selecciona el estado del producto.",
      }));
    } else if (userData.descripcion.trim() === "") {
      setCreatePostError((prevErrors) => ({
        ...prevErrors,
        errorDescripcion: "Describe tu producto.",
      }));
    } else {
      setCreatePostSuccess("Post creado con éxito");
      setCreatePostError({
        errorTitulo: "",
        errorPrecio: "",
        errorCategorias: "",
        errorEstado: "",
        errorDescripcion: "",
      });
    }
  };

  console.log(createPostError.errorPrecio);
  useEffect(() => {
    // Función para determinar si se debe enfocar algún input
    const shouldFocusInput = () => {
      return (
        createPostError.errorTitulo ||
        createPostError.errorPrecio ||
        createPostError.errorCategorias ||
        createPostError.errorEstado ||
        createPostError.errorDescripcion
      );
    };

    if (shouldFocusInput()) {
      if (createPostError.errorTitulo) {
        inputRefs.titulo.current.focus();
      } else if (createPostError.errorPrecio) {
        inputRefs.precio.current.focus();
      } else if (createPostError.errorCategorias) {
        inputRefs.categorias.current.focus();
      } else if (createPostError.errorEstado) {
        inputRefs.estado.current.focus();
      } else if (createPostError.errorDescripcion) {
        inputRefs.descripcion.current.focus();
      }
      return;
    }
  }, [createPostError]);

  return (
    <section className="createpost__container bg-white shadow-sm">
      <h1 className="createpost__title text-2xl font-semibold">
        Nueva publicación
      </h1>
      <div className="createpost__card__container ">
        <form
          onSubmit={handlePostSubmit}
          className="createpost__card__form bg-white shadow-sm mt-4 border rounded-md"
          name="post"
        >
          <div className="createpost__card__file__container mb-5">
            <div
              className="createpost__card__fileimg cursor-pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="createpost__card__fileparagraph">
                  Drop the files here ...
                </p>
              ) : (
                <div className="flex justify-center items-center gap-3">
                  <p className="createpost__card__fileparagraph font-medium">
                    Añadir imágen
                  </p>
                  <IoMdImages className="text-3xl" />
                </div>
              )}
            </div>
            <div className="createpost__card__imgpreview">
              {acceptedFiles[0] ? (
                <img
                  className="createpost__card__imgpreview__img"
                  src={URL.createObjectURL(acceptedFiles[0])}
                  alt=""
                />
              ) : (
                <p className="text-center">Vista previa...</p>
              )}
            </div>
          </div>
          <div className="createpost__card__data">
            <input
              ref={inputRefs.titulo}
              onChange={handleChangeInput}
              name="titulo"
              value={userData.titulo}
              className={`createpost__card__input ${
                createPostError.errorTitulo
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              type="text"
              placeholder="Título"
            />
            {userData.titulo.trim() === "" ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {createPostError.errorTitulo}
              </p>
            ) : (
              ""
            )}
            <input
              ref={inputRefs.precio}
              onChange={handleChangeInput}
              name="precio"
              value={userData.precio}
              className={`createpost__card__input ${
                createPostError.errorPrecio
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              type="text"
              placeholder="Precio"
            />
            {userData.precio.trim() === "" ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {createPostError.errorPrecio}
              </p>
            ) : (
              ""
            )}
            <select
              ref={inputRefs.categorias}
              onChange={handleChangeInput}
              className={`createpost__card__input ${
                createPostError.errorCategorias
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              name="categorias"
              value={userData.categorias}
              id="categorias"
            >
              <option value="">Categorías</option>
              <option value="consolas">Consolas</option>
              <option value="accesorios">Accesorios</option>
              <option value="monitores">Monitores</option>
              <option value="componentes">Componentes</option>
              <option value="telefonos">Telefonía</option>
              <option value="electrodomesticos">Electrodomésticos</option>
            </select>
            {userData.categorias === "" ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {createPostError.errorCategorias}
              </p>
            ) : (
              ""
            )}
            <select
              ref={inputRefs.estado}
              onChange={handleChangeInput}
              className={`createpost__card__input ${
                createPostError.errorEstado
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              value={userData.estado}
              name="estado"
              id="estado"
            >
              <option value="">Estado del producto</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado-como-nuevo">Usado-Como nuevo</option>
              <option value="usado-aceptable">Usado-Aceptable</option>
            </select>
            {userData.estado === "" ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {createPostError.errorEstado}
              </p>
            ) : (
              ""
            )}
            <textarea
              ref={inputRefs.descripcion}
              onChange={handleChangeInput}
              className={`createpost__card__input resize-none ${
                createPostError.errorDescripcion
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              value={userData.descripcion}
              name="descripcion"
              id=""
              rows="5"
              placeholder="Descripción"
            ></textarea>
            {userData.descripcion === "" ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {createPostError.errorDescripcion}
              </p>
            ) : (
              ""
            )}
            <GeneralBtn className="createpost__form__btn bg-teal-400">
              Crear publicación
            </GeneralBtn>
          </div>
        </form>
        <div className="createpost__preview__desktop bg-white shadow-sm border rounded-md">
          <div className="createpost__preview__body bg-gray-200">
            {acceptedFiles[0] ? (
              <img
                className="createpost__preview__img"
                src={URL.createObjectURL(acceptedFiles[0])}
                alt=""
              />
            ) : (
              <div>
                <p className="text-xl text-center mb-2 font-semibold">
                  Vista previa...
                </p>
                <p className="">Acá aparecerá tu imágen cuando la subas.</p>
              </div>
            )}
          </div>
          <div className="createpost__preview__data">
            <h1 className="createpost__preview__data__title text-3xl font-semibold mb-2">
              {userData.titulo ? <p>{userData.titulo}</p> : <p>Título</p>}
            </h1>
            {userData.precio ? (
              <p>
                {parseInt(userData.precio).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </p>
            ) : (
              <p>Precio</p>
            )}
            <p className="font-medium text-lg mb-5">Detalles</p>
            {userData.descripcion ? (
              <p className="">{userData.descripcion}</p>
            ) : (
              <p className="mb-8">
                Aquí aparecerán los detalles de tu publicación.
              </p>
            )}
            <hr />
            <p className="mt-5">Información del vendedor</p>
          </div>
        </div>
      </div>
    </section>
  );
}
