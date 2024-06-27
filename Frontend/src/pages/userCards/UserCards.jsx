import "../userCards/userCards.css";
import { Link, useNavigate } from "react-router-dom";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { ProductContext } from "../../context/ProductContext";
import { Loader } from "../../components/loader/Loader";

export function UserCards() {
  const navigate = useNavigate();

  const handleNavigateToAddCard = () => {
    navigate("/add-credit-cards");
  };
  const { userToken, user, userCreditCards, handleUserCards } =
    useContext(UserContext);
  const { loading, setLoading } = useContext(ProductContext);

  const handleDeleteCards = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://edimarket.onrender.com/usuarios/usuario/metodosPago/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar tarjeta");
      }

      const data = await response.json();
      handleUserCards();
      return data;
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="usercards__container bg-white shadow-sm rounded-sm">
      <h1 className="mb-5">Mis tarjetas</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="usercards__body">
          {userCreditCards.length ? (
            <div className="credit-card__body">
              {userCreditCards.map((card) => (
                <div
                  key={card?.numero_tarjeta}
                  className="flex border rounded-md p-5"
                >
                  <div className="flex items-center justify-start gap-5 w-full">
                    <div className="credit-card-container">
                      <img
                        className="credit-card__img"
                        src={`/imgs/aplication/${
                          card?.tipo_tarjeta === "visa"
                            ? "visa.png"
                            : "mastercard.png"
                        }`}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold text-lg">
                        {card?.tipo_tarjeta.charAt(0).toUpperCase() +
                          card?.tipo_tarjeta.slice(1)}
                      </span>
                      <div>
                        <span className="text-sm">Terminada en </span>
                        <span className="font-semibold">
                          {card?.numero_tarjeta.slice(11, 15)}
                        </span>
                      </div>

                      <span className="text-sm">
                        Vencimiento{" "}
                        <span className="font-semibold">
                          {card?.fecha_expiracion.slice(0, 2) +
                            "/" +
                            card?.fecha_expiracion.slice(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteCards(card?.id)}
                    className="self-end font-semibold hover:text-teal-500 text-sm sm:text-normal"
                  >
                    Eliminar
                  </button>
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
      )}
    </section>
  );
}
