import "../comments/comments.css";
import { GeneralBtn } from "../generalBtn/GeneralBtn";
import { IoIosStar } from "react-icons/io";

export function Comments() {
  const prueba = "sdas";

  return (
    <section className="comments__container">
      <h1 className="text-2xl mt-5">Comentarios</h1>
      <p className="mt-5">
        Deja tu comentario para que otras personas conozcan sobre este producto.
      </p>
      <div className="comments__container flex flex-col gap-10">
        <div className="comments__body w-full">
          <form className="comments__form__container">
            <div className="comments__input__body flex flex-col gap-5">
              <input
                className="input w-full"
                type="text"
                placeholder="Escribe tu comentario."
              />
              <GeneralBtn
                className="w-full h-12 flex items-center justify-center"
                type="secondary"
              >
                Comentar
              </GeneralBtn>
            </div>
          </form>
        </div>
        {prueba ? (
          <div className="opiniones__container">
            <h3 className="my-3 font-medium">Opiniones</h3>
            <div className="opiniones__body flex flex-col gap-8">
              <div className="">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm ">Edison Venegas</p>
                    <span className="flex items-center">
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">05/07/2024</p>
                  </div>
                </div>
                <div>
                  <p className="font-normal pl-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Corrupti, non tempore obcaecati dolore inventore totam
                    tempora nihil quae!
                  </p>
                </div>
              </div>
              <div className="">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm ">Edison Venegas</p>
                    <span className="flex items-center">
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">05/07/2024</p>
                  </div>
                </div>
                <div>
                  <p className="font-normal pl-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Corrupti, non tempore obcaecati dolore inventore totam
                    tempora nihil quae!
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">
            Aún no hay comentarios. ¡Anímate y escribe uno!
          </p>
        )}
      </div>
    </section>
  );
}
