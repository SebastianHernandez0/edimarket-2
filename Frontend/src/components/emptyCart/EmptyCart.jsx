import React from 'react'
import emptyCart from '/public/imgs/aplication/emptycart.png';

export function EmptyCart() {
    return (
        <>
            <h1 className=''>¡Tu carro está vacío!</h1>
            <img src={emptyCart} alt="empty cart" />
            <button className='button-primary'>Volver a productos</button>
            {/* <ProductCard key={element.id}>
        <div className="cart__card__body">
          <img
            className="cart__card__img shadow-md"
            src={element.href}
            alt=""
          />
          <p className="card__card__paragraph text-md font-light">
            {element.nombre}
          </p>
        </div>
      </ProductCard> */}
        </>
    )
}
