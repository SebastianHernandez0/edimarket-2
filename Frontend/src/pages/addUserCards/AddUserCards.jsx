import { useContext, useEffect, useState } from "react";
import "../addUserCards/addUserCards.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { UserContext } from "../../context/UserContext";

export function AddUserCards() {
  const { handleChange, userData } = useContext(UserContext);

  const handleAddCreditCard = (e) => {
    e.preventDefault();
  };
  return (
    <section className="addusercards__container bg-white shadow-sm rounded-sm">
      <h1 className="mb-5">Añade una tarjeta</h1>
      <div className="addusercards__body">
        <div className="flex items center justify-center">
          <img
            className="creditcards "
            src={`/imgs/aplication/${
              userData.tipo === "visa"
                ? "visaCard.png"
                : userData.tipo === "mastercard"
                ? "mastercardCard.png"
                : "card.png"
            }`}
            alt=""
          />
        </div>
        <form
          onSubmit={handleAddCreditCard}
          className="addusercards__form flex flex-col justify-between w-full gap-5"
        >
          <select
            className="addusercards__input"
            placeholder="Tipo de tarjeta"
            type="text"
            name="tipo"
            value={userData.tipo}
            onChange={handleChange}
          >
            <option value="">Selecciona</option>
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
          </select>
          <input
            className="addusercards__input"
            placeholder="Número de tarjeta (45... o 25...)"
            type="text"
            maxLength="16"
            name="numeroTarjeta"
            value={userData.numeroTarjeta}
            onChange={handleChange}
          />
          <div className="flex items-center gap-5">
            <input
              className="addusercards__input"
              type="text"
              maxLength="4"
              name="expiracion"
              placeholder="Fecha de expiración"
              value={userData.expiracion}
              onChange={handleChange}
            />
            <input
              className="addusercards__input"
              type="text"
              maxLength="3"
              name="cvv"
              placeholder="CVV"
              value={userData.cvv}
              onChange={handleChange}
            />
          </div>
          <GeneralBtn type="secondary">Guardar</GeneralBtn>
        </form>
      </div>
    </section>
  );
}
