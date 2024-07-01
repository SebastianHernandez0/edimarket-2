import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ScrollTop() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
}
