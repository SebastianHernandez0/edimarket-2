import { useContext } from "react";
import "../myValorations/myValorations.css";
import { UserContext } from "../../context/UserContext";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

export function MyValorations() {
  const { orders } = useContext(UserContext);

  console.log(orders);
  return (
    <section className="myvalorations__container">
      <h1 className="text-2xl font-semibold mb-5">Mis valoraciones</h1>
      <div className="myvalorations__body bg-white shadow-sm rounded-md p-3 h-[480px]">
        {orders.length > 0 ? (
          orders.map((order) => {
            return (
              <div
                className="flex items-center border rounded-md p-3 gap-3"
                key={order.id}
              >
                <figure className="border rounded-md shadow">
                  <img className="w-[80px]" src={order.imagen} alt="" />
                </figure>
                <div>
                  <p className="font-medium">{order.nombre}</p>
                </div>
                <div>
                  <p>comprado el {order.fecha_venta}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full mt-6">
            <h3>No has hecho preguntas aún.</h3>
            <p>Cuando hagas preguntas aparecerán acá.</p>
          </div>
        )}
      </div>
    </section>
  );
}
