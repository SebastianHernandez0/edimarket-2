import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ScrollTop() {
  const navigate = useNavigate();

  return useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
}
