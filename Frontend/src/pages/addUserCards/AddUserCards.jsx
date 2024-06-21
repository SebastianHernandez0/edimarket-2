import { useContext, useEffect, useState } from "react";
import "../addUserCards/addUserCards.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { UserContext } from "../../context/UserContext";

export function AddUserCards() {
  const {
    handleChange,
    userData,
    onlyNumbersRegex,
    inputFormError,
    setInputFormError,
    inputRefs,
  } = useContext(UserContext);

  const [addCardSuccess, setAddCardSuccess] = useState({
    success: "",
    error: "",
  });

  const handleAddCreditCard = (e) => {
    e.preventDefault();

    if (userData.tipo === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorTipo: "Selecciona el tipo de tarjeta.",
      }));
    } else if (userData.numeroTarjeta.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorNumeroTarjeta: "Ingresa el número de tarjeta (Ficticio).",
      }));
    } else if (!onlyNumbersRegex.test(userData.numeroTarjeta.trim())) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorNumeroTarjeta: "Ingresa solo números.",
      }));
    } else if (userData.numeroTarjeta.trim().length < 16) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorNumeroTarjeta: "Número incompleto. (16 caractéres)",
      }));
    } else if (userData.nombreTitular.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorNombreTitular: "Ingresa el nombre del titular.",
      }));
    } else if (onlyNumbersRegex.test(userData.nombreTitular.trim())) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorNombreTitular: "No puedes ingresar números.",
      }));
    } else if (userData.expiracion.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorExpiracion: "Ingresa fecha de expiración.",
      }));
    } else if (userData.expiracion.trim().length < 4) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorExpiracion: "Fecha incompleta.",
      }));
    } else if (!onlyNumbersRegex.test(userData.expiracion.trim())) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorExpiracion: "Ingresa solo números.",
      }));
    } else if (userData.cvv.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorCvv: "Ingresa el CVV.",
      }));
    } else if (!onlyNumbersRegex.test(userData.cvv.trim())) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorCvv: "Ingresa solo números.",
      }));
    } else if (userData.cvv.trim().length < 3) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorCvv: "CVV incompleto.",
      }));
    } else {
    }
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
          className="addusercards__form flex flex-col justify-between w-full"
        >
          <select
            ref={inputRefs.tipo}
            className={`addusercards__input ${
              inputFormError.errorTipo
                ? "focus: outline-2 outline outline-red-600"
                : "focus: outline-2 outline-green-300"
            }`}
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
          {inputFormError.errorTipo ? (
            <p className="text-red-600 font-semibold text-sm">
              {inputFormError.errorTipo}
            </p>
          ) : (
            ""
          )}

          <input
            ref={inputRefs.numeroTarjeta}
            className={`addusercards__input ${
              inputFormError.numeroTarjeta
                ? "focus: outline-2 outline outline-red-600"
                : "focus: outline-2 outline-green-300"
            }`}
            placeholder="Número de tarjeta"
            type="text"
            maxLength="16"
            name="numeroTarjeta"
            value={userData.numeroTarjeta}
            onChange={handleChange}
          />
          {inputFormError.errorNumeroTarjeta ? (
            <p className="text-red-600 font-semibold text-sm">
              {inputFormError.errorNumeroTarjeta}
            </p>
          ) : (
            ""
          )}
          <input
            ref={inputRefs.nombreTitular}
            className={`addusercards__input ${
              inputFormError.errorNombreTitular
                ? "focus: outline-2 outline outline-red-600"
                : "focus: outline-2 outline-green-300"
            }`}
            type="text"
            name="nombreTitular"
            placeholder="Nombre del titular"
            value={userData.nombreTitular}
            onChange={handleChange}
          />
          {inputFormError.errorNombreTitular ? (
            <p className="text-red-600 font-semibold text-sm">
              {inputFormError.errorNombreTitular}
            </p>
          ) : (
            ""
          )}
          <div className="flex items-start gap-5 ">
            <div className="flex flex-col w-full">
              <input
                ref={inputRefs.expiracion}
                className={`addusercards__input ${
                  inputFormError.errorExpiracion
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                type="text"
                maxLength="4"
                name="expiracion"
                placeholder="Fecha de expiración"
                value={userData.expiracion}
                onChange={handleChange}
              />
              {inputFormError.errorExpiracion ? (
                <p className="text-red-600 font-semibold text-sm">
                  {inputFormError.errorExpiracion}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col w-full">
              <input
                ref={inputRefs.cvv}
                className={`addusercards__input ${
                  inputFormError.errorCvv
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                type="text"
                maxLength="3"
                name="cvv"
                placeholder="CVV"
                value={userData.cvv}
                onChange={handleChange}
              />
              {inputFormError.errorCvv ? (
                <p className="text-red-600 font-semibold text-sm">
                  {inputFormError.errorCvv}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <GeneralBtn className="addusercards__btn" type="secondary">
            Guardar
          </GeneralBtn>
        </form>
      </div>
    </section>
  );
}
