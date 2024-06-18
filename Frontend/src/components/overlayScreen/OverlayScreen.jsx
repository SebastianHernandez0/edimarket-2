import { useContext, useEffect, useRef } from "react";
import "../overlayScreen/overlayScreen.css";
import { CartContext } from "../../context/CarritoContext";

export function OverlayScreen() {
  const { cartModal } = useContext(CartContext);

  const overlayRef = useRef(null);

  useEffect(() => {
    if (cartModal) {
      overlayRef.current.classList.remove("overlayNone");
      overlayRef.current.classList.add("overlayVisible");
    } else {
      overlayRef.current.classList.add("overlayNone");
      overlayRef.current.classList.remove("overlayVisible");
    }
  }, [cartModal]);

  return <div ref={overlayRef} className="overlay overlayNone"></div>;
}
