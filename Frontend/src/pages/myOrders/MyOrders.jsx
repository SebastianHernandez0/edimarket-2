import { useEffect, useState, useContext } from "react";
import classNames from "classnames";
import { Loader } from "../../components/loader/Loader";
import { UserContext } from "../../context/UserContext";
import myOrders from "./myOrders.module.css";
import delivery from "/imgs/aplication/delivery.png";

export function MyOrders() {
  const { userToken, user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userToken) {
          const response = await fetch(
            `http://localhost:3000/usuarios/usuario/ventas/?idUsuario=${user.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error fetching orders");
          }
          const data = await response.json();

          setOrders(data.ventas);
          setLoading(false);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("es-ES", options).toUpperCase();
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(precio);
  };

  return (
    <div
      className={classNames(
        "myOrders__container pt-10 bg-white shadow-sm rounded-sm",
        myOrders.myOrders__container
      )}
    >
      <h1 className="mb-4">Mis compras</h1>
      <div className="orders_box ">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col items-center h-full gap-5">
            {orders.length > 0 ? (
              orders.map((order, index) => {
                return (
                  <div
                    className={classNames(
                      "order_box flex flex-row w-full border shadow-sm rounded-md gap-2",
                      myOrders.order__container
                    )}
                    key={`${order.producto_id}_${index}`}
                  >
                    <div>
                      <h2 className="pb-2 text-base sm:text-lg">
                        Número de órden: #{`${order.producto_id * 2}`}
                      </h2>
                      <p className="text-sm mb-3">
                        Fecha de compra: {formatDate(order.fecha_venta)}
                      </p>
                      <p className="font-semibold">
                        {formatearPrecio(order.valor_total)}
                      </p>
                    </div>
                    <div>
                      <img className="w-[100px] h-[80px] sm:w-[120px]h-[100px] object-cover" src={order.imagen} alt="" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center gap-12">
                <h2 className="text-center font-semibold text-3xl">Aún no tienes compras.</h2>
                <p>Cuando compres , tus compras aparecerán acá</p>
                <img className="w-[200px]" src={delivery} alt="" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
