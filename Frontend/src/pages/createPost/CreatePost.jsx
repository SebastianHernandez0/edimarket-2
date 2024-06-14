import "../createPost/createPost.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function CreatePost() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className="createpost__container">
      <h1 className="createpost__title text-2xl font-semibold">
        Nueva publicación
      </h1>
      <div className="createpost__card__container bg-white shadow-sm">
        <form className="createpost__card__form" name="post">
          <div className="createpost__card__file__container">
            <div className="createpost__card__fileimg" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="createpost__card__fileparagraph">
                  Drop the files here ...
                </p>
              ) : (
                <p className="createpost__card__fileparagraph">Agregar fotos</p>
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
            <select name="" id="">
              <option value="">Categorías</option>
              <option value="">Consolas</option>
              <option value="">Accesorios</option>
              <option value="">Monitores</option>
              <option value="">Componentes</option>
              <option value="">Telefonía</option>
              <option value="">Electrodomésticos</option>
            </select>
            <select name="" id="">
              <option value="">Estado del producto</option>
              <option value="">Nuevo</option>
              <option value="">Usado-Como nuevo</option>
              <option value="">Usado-Aceptable</option>
            </select>
            <textarea name="" id="" placeholder="Descripción"></textarea>
          </div>
        </form>
      </div>
    </section>
  );
}
