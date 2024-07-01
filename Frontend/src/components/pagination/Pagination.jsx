import { useContext } from "react";
import "../pagination/pagination.css";
import { TbChevronRightPipe } from "react-icons/tb";
import { TbChevronLeftPipe } from "react-icons/tb";
import { TbChevronRight } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import { ProductContext } from "../../context/ProductContext";

export function Pagination() {
  const { totalPage, page, setPage, limit, totalProducts } =
    useContext(ProductContext);

  const totalPages = Math.ceil(totalProducts / limit);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };

  return (
    <section className="pagination__container">
      <hr className="" />
      <div className="flex flex-col sm:flex-row items-center mt-2 gap-2">
        <span className="text-sm">
          items por página <span className="font-medium">{totalPage}</span>{" "}
        </span>
        <div className="flex items-center gap-1 sm:gap-3">
          <TbChevronLeftPipe
            onClick={handleFirstPage}
            className={`pagination__arrow pagination__arrow__first ${
              page === 1 ? "text-gray-400 hover:bg-none" : ""
            }`}
          />
          <TbChevronLeft
            onClick={handlePrev}
            className={`pagination__arrow pagination__arrow__prev ${
              page === 1 ? "text-gray-400" : ""
            }`}
            disabled={page === 1}
          />
          <span className="font-medium">{page}</span>
          <TbChevronRight
            onClick={handleNext}
            className={`pagination__arrow pagination__arrow__next ${
              page === totalPages ? "text-gray-400 hover:bg-none" : ""
            }`}
            disabled={page === totalPages}
          />
          <TbChevronRightPipe
            onClick={handleLastPage}
            className={`pagination__arrow pagination__arrow__last ${
              page === totalPages ? "text-gray-400 hover:bg-none" : ""
            }`}
            disabled={page === totalPages}
          />
        </div>
      </div>
    </section>
  );
}
