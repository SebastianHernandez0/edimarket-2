import { forwardRef } from "react";

export const CartAlert = forwardRef(({ children, className, style }, ref) => {
  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
});
