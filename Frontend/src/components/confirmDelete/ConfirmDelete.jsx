import React, { forwardRef } from "react";

export const ConfirmDelete = forwardRef(
  ({ children, style, className,onClick }, ref) => {
    return (
      <div onClick={onClick} ref={ref} style={style} className={className}>
        {children}
      </div>
    );
  }
);
