import { useContext } from "react";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import "../addUserAddress/addUserAddress.css";
import { UserContext } from "../../context/UserContext";

export function AddUserAdress() {
  /*
     idUsuario,
      direccion,
      numero_casa,
      ciudad,
      comuna,
      region,
      codigo_postal,

*/

  const {
    setUserData,
    setInputFormError,
    userData,
    handleChange,
    inputRefs,
    onlyNumbersRegex,
    inputFormError,
  } = useContext(UserContext);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    setInputFormError({
      errorDireccion: "",
      errorRegion: "",
      errorComuna: "",
      errorCodigoPostal: "",
      errorNumero: "",
    });

    if (userData.direccion.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorDireccion: "Ingresa tu dirección.",
      }));
    } else if (userData.region.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorRegion: "Selecciona la región.",
      }));
    } else if (userData.comuna.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorComuna: "Selecciona la comuna.",
      }));
    } else if (userData.codigoPostal.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorCodigoPostal: "Ingresa el código postal.",
      }));
    } else if (!onlyNumbersRegex.test(userData.codigoPostal.trim())) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorCodigoPostal: "Ingresa solo números.",
      }));
    } else if (userData.numero.trim() === "") {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorNumero: "Ingresa el número de la dirección.",
      }));
    } else if (!onlyNumbersRegex.test(userData.numero.trim())) {
      setInputFormError((prevErrors) => ({
        ...prevErrors,
        errorNumero: "Ingresa solo números.",
      }));
    } else {
    }
  };

  return (
    <section className="edituseraddress__container bg-white shadow-sm rounded-sm">
      <h1 className="">Añadir dirección</h1>
      <div className="edituseraddress__body">
        <form
          onSubmit={handleAddressSubmit}
          className="edituseraddress__form border rounded-md shadow-sm"
        >
          <div className="nombre">
            <label htmlFor="">Dirección</label>
            <input
              onChange={handleChange}
              value={userData.direccion}
              className={`address__input ${
                inputFormError.errorDireccion
                  ? "focus: outline-2 outline outline-red-600"
                  : "focus: outline-2 outline-green-300"
              }`}
              type="text"
              name="direccion"
              ref={inputRefs.direccion}
            />
            {userData.direccion.trim() === "" ? (
              <p className="text-red-600 font-semibold text-sm ml-7">
                {inputFormError.errorDireccion}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="region w-full">
              <label htmlFor="">Region</label>
              <select
                ref={inputRefs.region}
                onChange={handleChange}
                value={userData.region}
                className={`address__input ${
                  inputFormError.errorRegion
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                name="region"
                id=""
              >
                <option value="">Selecciona</option>
                <option value="metropolitana">Metropolitana</option>
              </select>
              {userData.region === "" ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {inputFormError.errorRegion}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="comuna w-full">
              <label htmlFor="">Comuna</label>
              <select
                ref={inputRefs.comuna}
                onChange={handleChange}
                value={userData.comuna}
                className={`address__input ${
                  inputFormError.errorComuna
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                name="comuna"
                id=""
              >
                <option value="">Selecciona</option>
                <option value="san-miguel">San miguel</option>
                <option value="san-joaquin">San Joaquin</option>
                <option value="ñuñoa">Ñuñoa</option>
                <option value="maipu">Maipu</option>
                <option value="santiago-centro">Santiago centro</option>
                <option value="renca">Renca</option>
                <option value="pudahuel">Pudahuel</option>
                <option value="puente-alto">Puente alto</option>
                <option value="independencia">Independencia</option>
              </select>
              {userData.email === "" ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {inputFormError.errorComuna}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="region">
              <label htmlFor="">Código postal</label>
              <input
                ref={inputRefs.codigoPostal}
                onChange={handleChange}
                value={userData.codigoPostal}
                className={`address__input ${
                  inputFormError.errorCodigoPostal
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                type="text"
                name="codigoPostal"
              />
              {userData.codigoPostal.trim() === "" ||
              !onlyNumbersRegex.test(userData.codigoPostal.trim()) ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {inputFormError.errorCodigoPostal}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="comuna">
              <label htmlFor="">Número</label>
              <input
                ref={inputRefs.numero}
                onChange={handleChange}
                value={userData.numero}
                className={`address__input ${
                  inputFormError.errorNumero
                    ? "focus: outline-2 outline outline-red-600"
                    : "focus: outline-2 outline-green-300"
                }`}
                type="text"
                name="numero"
              />
              {userData.numero.trim() === "" ||
              !onlyNumbersRegex.test(userData.numero.trim()) ? (
                <p className="text-red-600 font-semibold text-sm ml-7">
                  {inputFormError.errorNumero}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <GeneralBtn
            type="secondary"
            className="adress__btn self-end justify-self-end"
          >
            Guardar
          </GeneralBtn>
        </form>
      </div>
    </section>
  );
}
