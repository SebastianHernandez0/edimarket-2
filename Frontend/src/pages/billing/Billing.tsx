import React from 'react'
import { PaymentMethods } from '../../components/paymentMethods/PaymentMethods'

{/* <nav></nav>
listaProductos
asideResumenDeCompra
<footer></footer> */}

export function Billing() {
  return (
    <>
      <h1>¿Cómo quieres pagar?</h1>
      <PaymentMethods />
      <button>Pagar</button>
      {/* loader y alert pago exitoso */}
    </>
  )
}

