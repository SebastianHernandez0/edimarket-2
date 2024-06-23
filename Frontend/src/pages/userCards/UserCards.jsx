import "../userCards/userCards.css";
import { Link, useNavigate } from "react-router-dom";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

export function UserCards() {
  const navigate = useNavigate();

  const handleNavigateToAddCard = () => {
    navigate("/add-credit-cards");
  };
  const { userToken, user, userCreditCards, setUserCreditCards } =
    useContext(UserContext);

  const handleUserCards = async () => {
    const response = await fetch(
      `http://localhost:3000/usuarios/usuario/metodosPago/?idUsuario=${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener tarjetas");
    }

    const data = await response.json();

    setUserCreditCards(
      data.metodos.map((d) => {
        return {
          ...d,
        };
      })
    );

    return data;
  };

  useEffect(() => {
    handleUserCards();
  }, []);

  return (
    <section className="usercards__container bg-white shadow-sm rounded-sm">
      <h1 className="mb-5">Mis tarjetas</h1>
      <div className="usercards__body">
        {userCreditCards.length ? (
          <div className="credit-card__body">
            {userCreditCards.map((card) => (
              <div
                key={card.numero_tarjeta}
                className="flex border rounded-md p-5"
              >
                <div className="flex items-center justify-start gap-5 w-full">
                  <div className="credit-card-container">
                    <img
                      className="credit-card__img"
                      src={`/imgs/aplication/${
                        card.tipo_tarjeta === "visa"
                          ? "visa.png"
                          : "mastercard.png"
                      }`}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-lg">
                      {card.tipo_tarjeta.charAt(0).toUpperCase() +
                        card.tipo_tarjeta.slice(1)}
                    </span>
                    <div>
                      <span className="text-sm">Terminada en </span>
                      <span className="font-semibold">
                        {card.numero_tarjeta.slice(11, 15)}
                      </span>
                    </div>

                    <span className="text-sm">
                      Vencimiento{" "}
                      <span className="font-semibold">
                        {card.fecha_expiracion}
                      </span>
                    </span>
                  </div>
                </div>
                <Link className="self-end font-semibold hover:text-teal-500 text-sm sm:text-normal">
                  Eliminar
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center sm:my-5">
            <p className="font-semibold">Agrega una tarjeta de crédito</p>
            <GeneralBtn
              onClick={handleNavigateToAddCard}
              type="secondary"
              className="credit-card-btn"
            >
              Añadir
            </GeneralBtn>
          </div>
        )}
        {userCreditCards.length > 0 ? (
          <GeneralBtn
            onClick={handleNavigateToAddCard}
            type="secondary"
            className="credit-card-btn_2"
          >
            Añadir
          </GeneralBtn>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
