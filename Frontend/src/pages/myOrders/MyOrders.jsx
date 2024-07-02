import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { Loader } from '../../components/loader/Loader';
import { UserContext } from '../../context/UserContext';

export function MyOrders() {
    const { userToken, user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://edimarket.onrender.com/usuarios/usuario/ventas/?idUsuario=${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching orders');
                }

                const data = await response.json();
                setOrders(data.ventas);
                setLoading(false);

                console.log(data)
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userToken]);

    return (
        <div>
            <h1>Mis compras</h1>
            <div className='orders_container'>
                <div className="orders_box">
                    {loading ? (
                        <Loader />
                    ) : (
                        orders.map((order) => (
                            <div className="order_box" key={order.id}>
                                <h1>{order.id}</h1>
                                <p>{order.fecha_venta}</p>
                                <p>{order.cantidad}</p>
                                <p>{order.precio}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
