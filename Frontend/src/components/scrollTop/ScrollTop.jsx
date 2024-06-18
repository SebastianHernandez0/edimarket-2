import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ScrollTop() {
  const navigate = useNavigate();

  window.scrollTo(0, 0);

  return useEffect(() => {}, [navigate]);
}
