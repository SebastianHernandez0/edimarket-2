import "../userCards/userCards.css";
import { Link } from "react-router-dom";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";

export function UserCards() {
  const prueba = "";

  return (
    <section className="usercards__container bg-white shadow-sm rounded-sm">
      <h1 className="mb-5">Mis tarjetas</h1>
      <div className="usercards__body">
        {prueba ? (
          <div className="credit-card__body">
            <div className="flex border rounded-md p-5">
              <div className="flex items-center justify-start gap-5 w-full">
                <div className="credit-card-container">
                  <img
                    className="credit-card__img"
                    src="/imgs/aplication/mastercard.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <span>Santander</span>
                  <span>
                    Vencimiento <span>08/27</span>
                  </span>
                </div>
              </div>
              <Link className="self-end font-semibold hover:text-teal-500">
                Eliminar
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center sm:my-5">
            <p className="font-semibold">Agrega una tarjeta de crédito</p>
            <GeneralBtn type="secondary" className="">
              Añadir
            </GeneralBtn>
          </div>
        )}
      </div>
    </section>
  );
}
