import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import "../editUserData/editUserData.css";

export function EditUserData() {
  return (
    <section className="edituserdata__container bg-white shadow-sm rounded-sm">
      <h1 className="mb-5">Edita y guarda tus datos</h1>
      <div className="edituserdata__body">
        <form className="edituserdata__form border rounded-md py-5 px-3 flex flex-col">
          <div>
            <label className="font-semibold" htmlFor="">
              Nombre y apellido
            </label>
            <input className="data__input" name="name" type="text" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="">
              RUT
            </label>
            <input className="data__input" name="rut" type="text" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="">
              Email
            </label>
            <input className="data__input" name="email" type="text" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="">
              Telefono
            </label>
            <input className="data__input" name="phone" type="text" />
          </div>
          <GeneralBtn className="text-center self-center" type="secondary">
            Guardar
          </GeneralBtn>
        </form>
      </div>
    </section>
  );
}
