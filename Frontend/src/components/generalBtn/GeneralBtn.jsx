export function GeneralBtn({ type, className, children, onClick, style }) {
  const getButtonClass = () => {
    switch (type) {
      case "primary":
        return "btn btn-primary";
      case "secondary":
        return "btn btn-secondary";
      case "tertiary":
        return "btn btn-tertiary";
      default:
        return "btn";
    }
  };

  return (
    <button
      style={style}
      className={`${getButtonClass()} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
