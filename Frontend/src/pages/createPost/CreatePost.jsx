import "../createPost/createPost.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdImages } from "react-icons/io";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";

export function CreatePost() {
  const [userData, setUserData] = useState({
    titulo: "",
    precio: "",
    descripcion: "",
    categorias: "",
    estado: "",
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

  return (
    <section className="createpost__container bg-white shadow-sm">
      <h1 className="createpost__title text-2xl font-semibold">
        Nueva publicación
      </h1>
      <div className="createpost__card__container ">
        <form
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
              onChange={handleChangeInput}
              name="titulo"
              value={userData.titulo}
              className="createpost__card__input"
              type="text"
              placeholder="Título"
            />
            <input
              onChange={handleChangeInput}
              name="precio"
              value={userData.precio}
              className="createpost__card__input"
              type="text"
              placeholder="Precio"
            />
            <select
              onChange={handleChangeInput}
              className="createpost__card__input"
              name=""
              id=""
            >
              <option value="categorias">Categorías</option>
              <option value="consolas">Consolas</option>
              <option value="accesorios">Accesorios</option>
              <option value="monitores">Monitores</option>
              <option value="componentes">Componentes</option>
              <option value="telefonos">Telefonía</option>
              <option value="electrodomesticos">Electrodomésticos</option>
            </select>
            <select className="createpost__card__input" name="" id="">
              <option value="">Estado del producto</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado-como-nuevo">Usado-Como nuevo</option>
              <option value="usado-aceptable">Usado-Aceptable</option>
            </select>
            <textarea
              onChange={handleChangeInput}
              className="createpost__card__input resize-none"
              value={userData.descripcion}
              name="descripcion"
              id=""
              rows="5"
              placeholder="Descripción"
            ></textarea>
            <GeneralBtn className="createpost__form__btn">
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
