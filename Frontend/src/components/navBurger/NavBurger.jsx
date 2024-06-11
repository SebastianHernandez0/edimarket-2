import "../navBurger/navBurger.css";

export function NavBurger({ clicked, toggleIcon }) {
  return (
    <div
      className={`nav-icon3 navActiveMenu ${clicked ? "open" : ""}`}
      onClick={toggleIcon}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
