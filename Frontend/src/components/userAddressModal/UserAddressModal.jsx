import "../userAddressModal/userAddressModal.css";

export function UserAddressModal() {
  return (
    <section className="addressmodal__container bg-white shadow-sm rounded-md border">
      <button className="edit__btn w-full font-medium">Editar</button>
      <button className="edit__btn w-full font-medium">Eliminar</button>
    </section>
  );
}
