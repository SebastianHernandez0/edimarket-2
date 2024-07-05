import "../questions/questions.css";
import { GeneralBtn } from "../generalBtn/GeneralBtn";

export function Questions() {
  return (
    <section className="questions__container">
      <h1 className="text-2xl mt-5">Preguntas</h1>
      <div className="">
        <div className="comments__body w-full">
          <form className="comments__form__container mt-7">
            <div className="comments__input__body flex flex-col gap-5 md:flex-row items-center">
              <input
                className="input w-full"
                type="text"
                placeholder="Escribe tu comentario."
              />
              <GeneralBtn
                className="w-full h-12 flex items-center justify-center md:w-1/3"
                type="secondary"
              >
                Comentar
              </GeneralBtn>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
