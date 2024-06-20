import { useContext } from 'react';
import summary from "./summary.module.css";
import { GeneralBtn } from '../generalBtn/GeneralBtn';
import { CartContext } from '../../context/CarritoContext';
import { NavLink } from 'react-router-dom';

export function Summary() {
    const { cartModal, setCartModal, cart } = useContext(CartContext);

    // Calcular el total de productos
    const totalProductos = cart.reduce((acc, producto) => acc + producto.cantidad, 0);

    // Calcular el precio total
    const totalPrecio = cart.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    return (
        <div className="p-4">
            <div>
                <h2>Resumen de compra:</h2>
                <p>Productos: {totalProductos}</p>
                <p>Total: ${totalPrecio.toFixed(2)}</p>
            </div>
        </div>
    );
}
