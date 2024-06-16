export function Shipping() {
  return (
    <>
      <h1 className='mt-[100px]'>Elige un método de envío:</h1>
      <div className='pickup'>
        <h2>Pickup</h2>
        <input type="checkbox" id="cbox2" value="second_checkbox" />
        <label>Recoger n el centro de retiro más cercano</label>
      </div>
      <div className='delivery'>
        <h2>selecciona una de tus direcciones</h2>
        {/* acá un mapeo , este debe ser un componente*/}
        <div className='deliveryAdress'>
          <input type="checkbox" id="cbox2" value="second_checkbox" />
          <label>Av simon bolivar 2420</label>
        </div>
      </div>
    </>
  )
}
