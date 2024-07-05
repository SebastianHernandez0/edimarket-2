import "../questions/questions.css";
import { GeneralBtn } from "../generalBtn/GeneralBtn";

export function Questions() {
  const prueba = "sas";
  const respuesta = "";

  return (
    <section className="questions__container">
      <h1 className="text-2xl mt-5">Preguntas</h1>
      <div className="">
        <div className="questions__body __container w-full">
          <form className="questions__form__container mt-7">
            <div className="questions__input__body flex flex-col gap-5 md:flex-row items-center">
              <input
                className="input w-full"
                type="text"
                placeholder="Haz una pregunta..."
              />
              <GeneralBtn
                className="w-full h-12 flex items-center justify-center md:w-1/3"
                type="secondary"
              >
                Preguntar
              </GeneralBtn>
            </div>
          </form>
        </div>
        <div>
          {prueba ? (
            <div className="ml-5 questions__body mt-10 h-full">
              <div className="mb-5">
                <p className="mt-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum, accusamus.?
                </p>
                {respuesta ? (
                  <div className="flex items-center gap-3">
                    <p className="ml-3 text-sm text-gray-400">Sí</p>
                    <p className="text-sm text-gray-400">05/07/2024</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mt-2 ml-3">
                    Esperando respuesta del vendedor...
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-10">
              <p>Aún no han hecho preguntas sobre este producto. </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
