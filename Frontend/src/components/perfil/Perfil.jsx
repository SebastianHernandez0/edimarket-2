import { useEffect, useRef } from "react";

export function Perfil({
  children,
  className,
  openPerfilMenu,
  setOpenPerfilMenu,
  perfilMenuRef,
  perfilButtonRef,
}) {
  useEffect(() => {
    const perfilMenu = perfilMenuRef.current;

    if (!openPerfilMenu) {
      perfilMenu.classList.add("navUserActiveMenu");
    } else {
      perfilMenu.classList.remove("navUserActiveMenu");
    }

    const handleClickOutside = (event) => {
      if (
        perfilMenu &&
        !perfilMenu.contains(event.target) &&
        perfilButtonRef.current &&
        !perfilButtonRef.current.contains(event.target)
      ) {
        setOpenPerfilMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPerfilMenu]);
  return <div className={className}>{children}</div>;
}
