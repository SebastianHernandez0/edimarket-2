import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

export function ScrollTop() {
  const navigate = useNavigate();
  const { page } = useContext(ProductContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 600);
  }, [page]);
}
