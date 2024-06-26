import { forwardRef } from "react";

export const GeneralBtn = forwardRef(
  ({ type, className, children, onClick, style }, ref) => {
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
        ref={ref}
        style={style}
        className={`${getButtonClass()} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
