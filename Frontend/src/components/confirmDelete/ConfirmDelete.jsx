import React, { forwardRef } from "react";

export const ConfirmDelete = forwardRef(
  ({ children, style, className }, ref) => {
    return (
      <div ref={ref} style={style} className={className}>
        {children}
      </div>
    );
  }
);
