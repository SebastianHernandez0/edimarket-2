import "../questions/questions.css";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { UserContext } from "../../context/UserContext";

import { Loader } from "../loader/Loader";

export function Questions() {
  const { questionsByProductId, loading } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const respuesta = "";

  return (
    <section className="questions__container">
      <h1 className="text-2xl mt-5">Preguntas</h1>
      <div className="">
        {loading ? (
          <Loader />
        ) : (
          <div>
            {questionsByProductId.length > 0 ? (
              <div className="ml-5 questions__body mt-10 h-full">
                {user?.id ? (
                  <div>
                    <h3 className="mb-3 font-semibold">Tus preguntas</h3>
                    <div className="bg-gray-100 p-3 rounded-md flex flex-col gap-5">
                      {questionsByProductId.map((pregunta) => {
                        return pregunta?.usuario_id === user?.id ? (
                          <div key={pregunta?.id} className="">
                            <div className="flex items-center justify-between relative">
                              <div>
                                <p className="">{pregunta?.pregunta}</p>
                              </div>
                            </div>
                            {respuesta ? (
                              <div className="flex items-center gap-3">
                                <p className="ml-3 text-sm text-gray-400 font-medium">
                                  Sí
                                </p>
                                <p className="text-sm text-gray-400 font-medium">
                                  05/07/2024
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-400 font-medium ml-3">
                                Esperando respuesta del vendedor...
                              </p>
                            )}
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <h3 className="mb-3 font-semibold mt-3">Últimas hechas</h3>
                {questionsByProductId.map((pregunta) => {
                  return pregunta?.usuario_id !== user?.id ? (
                    <div key={pregunta?.id}>
                      <div className="mb-5">
                        <div className="flex items-center justify-between mt-2 relative">
                          <div>
                            <p className="">{pregunta?.pregunta}</p>
                          </div>
                        </div>
                        {respuesta ? (
                          <div className="flex items-center gap-3">
                            <p className="ml-3 text-sm text-gray-400">Sí</p>
                            <p className="text-sm text-gray-400">05/07/2024</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400  ml-3">
                            Esperando respuesta del vendedor...
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center mt-10">
                <p>Aún no han hecho preguntas sobre este producto.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
