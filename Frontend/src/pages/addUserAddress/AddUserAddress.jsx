import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import "../addUserAddress/addUserAddress.css";

export function AddUserAdress() {
  return (
    <section className="edituseraddress__container bg-white shadow-sm rounded-sm">
      <h1 className="">Añadir dirección</h1>
      <div className="edituseraddress__body">
        <form className="edituseraddress__form border rounded-md shadow-sm">
          <div className="nombre">
            <label htmlFor="">Nombre y apellido</label>
            <input className="address__input" type="text" />
          </div>
          <div className="flex items-center gap-3">
            <div className="region w-full">
              <label htmlFor="">Region</label>
              <select className="address__input" name="" id="">
                <option value="">Metropolitana</option>
              </select>
            </div>
            <div className="comuna w-full">
              <label htmlFor="">Comuna</label>
              <select className="address__input" name="" id="">
                <option value="">San miguel</option>
                <option value="">San Joaquin</option>
                <option value="">Ñuñoa</option>
                <option value="">Maipu</option>
                <option value="">Santiago centro</option>
                <option value="">Renca</option>
                <option value="">Pudahuel</option>
                <option value="">Puente alto</option>
                <option value="">Independencia</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="region">
              <label htmlFor="">Dirección</label>
              <input className="address__input" type="text" />
            </div>
            <div className="comuna">
              <label htmlFor="">Número</label>
              <input className="address__input" type="text" />
            </div>
          </div>
          <GeneralBtn type="secondary" className="adress__btn self-end justify-self-end">
            Guardar
          </GeneralBtn>
        </form>
      </div>
    </section>
  );
}
