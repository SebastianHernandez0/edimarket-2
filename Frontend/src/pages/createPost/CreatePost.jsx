import "../createPost/createPost.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdImages } from "react-icons/io";

export function CreatePost() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className="createpost__container bg-white shadow-sm">
      <h1 className="createpost__title text-2xl font-semibold">
        Nueva publicación
      </h1>
      <div className="createpost__card__container bg-white shadow-sm">
        <form className="createpost__card__form" name="post">
          <div className="createpost__card__file__container">
            <div className="createpost__card__fileimg cursor-pointer" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="createpost__card__fileparagraph">
                  Drop the files here ...
                </p>
              ) : (
                <div className="flex justify-center items-center gap-3">
                  <p className="createpost__card__fileparagraph font-medium">
                    Añadir fotos
                  </p>
                  <IoMdImages className="text-3xl" />
                </div>
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
          </div>
        </form>
      </div>
    </section>
  );
}
