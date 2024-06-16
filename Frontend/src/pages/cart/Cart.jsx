import emptyCart from '/public/imgs/aplication/emptycart.png';
//acá debe ir la vista con y sin productos

{/* <nav></nav>
cartEmpty
<button></button> dentro de cart empty??
<footer></footer> */}

export function Cart() {

  return (
    <>
      <h1 className='mt-[100px]'>¡Tu carro está vacío!</h1>
      <img src={emptyCart} alt="empty cart" />
      <button>Volver a productos</button>
    </>
  )
}

