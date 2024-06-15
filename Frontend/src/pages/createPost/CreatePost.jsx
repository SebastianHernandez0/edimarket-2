import "../createPost/createPost.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdImages } from "react-icons/io";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";

export function CreatePost() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

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
              className="createpost__card__input"
              type="text"
              placeholder="Título"
            />
            <input
              className="createpost__card__input"
              type="text"
              placeholder="Precio"
            />
            <select className="createpost__card__input" name="" id="">
              <option value="">Categorías</option>
              <option value="">Consolas</option>
              <option value="">Accesorios</option>
              <option value="">Monitores</option>
              <option value="">Componentes</option>
              <option value="">Telefonía</option>
              <option value="">Electrodomésticos</option>
            </select>
            <select className="createpost__card__input" name="" id="">
              <option value="">Estado del producto</option>
              <option value="">Nuevo</option>
              <option value="">Usado-Como nuevo</option>
              <option value="">Usado-Aceptable</option>
            </select>
            <textarea
              className="createpost__card__input resize-none"
              name=""
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
              Título
            </h1>
            <p className="font-medium mb-4">Precio</p>
            <p className="font-medium text-lg mb-5">Detalles</p>
            <p className="mb-8">
              Aquí aparecerán los detalles de tu publicación.
            </p>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
}
