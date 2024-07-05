import "../comments/comments.css";
import { IoIosStar } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsDown } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";

export function Comments() {
  const prueba = "asd";

  return (
    <section className="comments__container">
      <h1 className="text-2xl mt-5">Valoraciones</h1>
      <p className="mt-5">
        Deja tu valoración al comprar para que otras personas conozcan sobre
        este producto.
      </p>
      <div className="comments__container flex flex-col gap-5">
        {prueba ? (
          <div className="opiniones__container">
            <h3 className="my-3 font-medium">Opiniones</h3>
            <div className="opiniones__body flex flex-col">
              <div className="">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm ">Edison Venegas</p>
                    <span className="flex items-center">
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStarOutline />
                      <IoIosStarOutline />
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
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2 cursor-pointer hover:outline outline-teal-500 outline-1 rounded-xl px-2">
                      <BsHandThumbsUp />
                      <span>0</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:outline outline-teal-500 outline-1 rounded-xl px-2">
                      <BsHandThumbsDown />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-5" />
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
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2">
                      <BsHandThumbsUp />
                      <span>0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BsHandThumbsDown />
                      <span>0</span>
                    </div>
                  </div>
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
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2">
                      <BsHandThumbsUp />
                      <span>0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BsHandThumbsDown />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center w-full my-8">
            Aún no hay valoraciones. ¡Compra y deja tu valoración!
          </p>
        )}
      </div>
    </section>
  );
}
