import "../personalData/personalData.css";

// los datos son ficticios, los reales se traeran desde la bs

export function PersonalData() {
  return (
    <section className="personaldata__container bg-white shadow-sm rounded-sm">
      <h1 className="text-2xl font-semibold mb-5">Datos personales</h1>
      <div className="personaldata__body">
        <hr />
        <div className="personaldata__name flex items-center justify-between my-5">
          <div className="flex items-center gap-10 flex-wrap w-full">
            <div className="flex flex-col">
              <p className="font-semibold mb-1 text-lg">Nombre y apellido</p>
              <p className="text-sm">Edison Alejandro Venegas Espinoza</p>
            </div>
            <div>
              <p className="font-semibold mb-1 text-lg">Rut</p>
              <span className="text-sm">18.056.328-8</span>
            </div>
          </div>
        </div>
        <div className="personaldata__email flex items-center justify-between my-5">
          <div className="flex items-center gap-10 flex-wrap w-full">
            <div className="flex flex-col">
              <p className="font-semibold mb-1 text-lg">Email</p>
              <p className="text-sm">Aalevenegass@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="personaldata__number flex items-center justify-between my-5">
          <div className="flex items-center gap-10 flex-wrap w-full">
            <div className="flex flex-col">
              <p className="font-semibold mb-1 text-lg">Número telefónico</p>
              <p className="text-sm">951105537</p>
            </div>
          </div>
        </div>
        <div className="personaldata__address flex items-center justify-between my-5">
          <div className="flex items-center gap-10 flex-wrap w-full">
            <div className="flex flex-col">
              <p className="font-semibold mb-1 text-lg">Dirección</p>
              <p className="text-sm">Pasaje uno poniente 7913, lo espejo</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-end w-full mt-5">
          <button className="edit__btn font-semibold  text-teal-500">
            Modificar
          </button>
        </div>
      </div>
    </section>
  );
}
