import { useContext, useState, useEffect } from "react";
import "../editMyPost/editMyPost.css";
import { UserContext } from "../../context/UserContext";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";

export function EditMyPost() {
  const {
    onlyNumbersRegex,
    userData,
    inputFormError,
    setInputFormError,
    handleChange,
    inputRefs,
    image_url_regex,
    userToken,
    setUserData,
    initialUserData,
  } = useContext(UserContext);

  const [editPostSuccess, setEditPostSuccess] = useState({
    success: "",
    error: "",
  });

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (userData.postimg.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorPostimg: "Ingresa la URL del producto.",
      }));
    } else if (!image_url_regex.test(userData.postimg)) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorPostimg: "Ingresa una URL válida.",
      }));
    } else if (userData.titulo.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorTitulo: "Pon un título a tu producto.",
      }));
    } else if (userData.precio === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorPrecio: "Pon un precio a tu producto.",
      }));
    } else if (!onlyNumbersRegex.test(userData.precio)) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorPrecio: "Ingresa solo números.",
      }));
    } else if (userData.categorias === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorCategorias: "Selecciona una categoria.",
      }));
    } else if (userData.productStock === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorProductStock: "Indica el stock de tu producto.",
      }));
    } else if (!onlyNumbersRegex.test(userData.productStock)) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorProductStock: "Ingresa solo númereos.",
      }));
    } else if (userData.estado.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorEstado: "Selecciona el estado del producto.",
      }));
    } else if (userData.descripcion.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorDescripcion: "Describe tu producto.",
      }));
    } else {
      try {
      } catch (error) {
        console.error("Error:", error.message);
        setEditPostSuccess((prevData) => ({
          ...prevData,
          error: "No pudimos publicar tu producto :(",
        }));
        setTimeout(() => {
          setEditPostSuccess((prevData) => ({
            ...prevData,
            error: "",
          }));
        }, 3000);
      }
    }
  };

  return (
    <section className="editmypost__container bg-white shadow-sm">
      <h1 className="text-2xl font-semibold mb-5">Editar publicación</h1>
      <div className="editmypost__body">
        <div className="createpost__card__container ">
          <form
            onSubmit={handlePostSubmit}
            className="createpost__card__form bg-white shadow-sm mt-4 border rounded-md"
            name="post"
          >
            <div className="createpost__card__file__container mb-5">
              <div className="createpost__card__imgpreview">
                {userData.postimg ? (
                  <img
                    className="createpost__card__imgpreview__img"
                    src={userData.postimg}
                    alt=""
                  />
                ) : (
                  <p className="text-center">Vista previa...</p>
                )}
              </div>
            </div>
            <div className="createpost__card__data">
              <input
                ref={inputRefs.postimg}
                type="text"
                className={`createpost__card__input ${
                  inputFormError.errorPostimg
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                name="postimg"
                id=""
                value={userData.postimg}
                onChange={handleChange}
                placeholder="Ingresa la URL de la imágen"
              />
              {inputFormError.errorPostimg ? (
                <p className="text-red-600 font-semibold text-sm">
                  {inputFormError.errorPostimg}
                </p>
              ) : (
                ""
              )}
              <input
                ref={inputRefs.titulo}
                onChange={handleChange}
                name="titulo"
                value={userData.titulo}
                className={`createpost__card__input ${
                  inputFormError.errorTitulo
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                type="text"
                placeholder="Título"
              />
              {inputFormError.errorTitulo ? (
                <p className="text-red-600 font-semibold text-sm">
                  {inputFormError.errorTitulo}
                </p>
              ) : (
                ""
              )}
              <input
                ref={inputRefs.precio}
                onChange={handleChange}
                name="precio"
                value={userData.precio || ""}
                className={`createpost__card__input ${
                  inputFormError.errorPrecio
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                type="text"
                placeholder="Precio"
              />
              {inputFormError.errorPrecio ? (
                <p className="text-red-600 font-semibold text-sm">
                  {inputFormError.errorPrecio}
                </p>
              ) : (
                ""
              )}
              <div className="createpost__select__container">
                <select
                  ref={inputRefs.categorias}
                  onChange={handleChange}
                  className={`createpost__card__input ${
                    inputFormError.errorCategorias
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
                  <option value="telefonia">Telefonía</option>
                  <option value="electrodomesticos">Electrodomésticos</option>
                </select>
                {inputFormError.errorCategorias ? (
                  <p className="text-red-600 font-semibold text-sm">
                    {inputFormError.errorCategorias}
                  </p>
                ) : (
                  ""
                )}
                <div className="flex flex-col ">
                  <input
                    onChange={handleChange}
                    ref={inputRefs.productStock}
                    className={`createpost__card__input ${
                      inputFormError.errorProductStock
                        ? "focus: outline-2 outline outline-red-600"
                        : "focus: outline-2 outline-green-300"
                    }`}
                    type="text"
                    name="productStock"
                    placeholder="Stock producto"
                  />
                  {inputFormError.errorProductStock ? (
                    <p className="text-red-600 font-semibold text-sm">
                      {inputFormError.errorProductStock}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <select
                ref={inputRefs.estado}
                onChange={handleChange}
                className={`createpost__card__input ${
                  inputFormError.errorEstado
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
              {inputFormError.errorEstado ? (
                <p className="text-red-600 font-semibold text-sm">
                  {inputFormError.errorEstado}
                </p>
              ) : (
                ""
              )}
              <textarea
                ref={inputRefs.descripcion}
                onChange={handleChange}
                className={`createpost__card__input resize-none ${
                  inputFormError.errorDescripcion
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                value={userData.descripcion}
                name="descripcion"
                id=""
                rows="5"
                placeholder="Descripción"
              ></textarea>
              {inputFormError.errorDescripcion ? (
                <p className="text-red-600 font-semibold text-sm">
                  {inputFormError.errorDescripcion}
                </p>
              ) : (
                ""
              )}
              <div className="flex flex-col items-center mt-4">
                {editPostSuccess.success ? (
                  <p className="font-bold text-green-600">
                    {editPostSuccess.success}
                  </p>
                ) : (
                  <p className="font-bold text-red-600">
                    {editPostSuccess.error}
                  </p>
                )}
              </div>
              <GeneralBtn
                type="secondary"
                className="createpost__form__btn my-4"
              >
                Actualizar
              </GeneralBtn>
            </div>
          </form>
          <div className="createpost__preview__desktop bg-white  border rounded-md">
            <div className="createpost__preview__body bg-gray-200">
              {userData.postimg ? (
                <div className="preview__img__container">
                  <img
                    className="createpost__preview__img"
                    src={userData.postimg}
                    alt=""
                  />
                  <img
                    className="createpost__preview__img__2"
                    src={userData.postimg}
                    alt=""
                  />
                </div>
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
                {userData.titulo ? (
                  <p className="text-2xl font-semibold">{userData.titulo}</p>
                ) : (
                  <p className="text-2xl font-semibold">Título</p>
                )}
              </h1>
              {userData.precio && !isNaN(userData.precio) ? (
                <p className="font-medium">
                  {parseInt(userData.precio).toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </p>
              ) : (
                <p className="font-medium">Precio</p>
              )}
              <p className="font-medium text-lg my-5">Detalles</p>
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
      </div>
    </section>
  );
}
