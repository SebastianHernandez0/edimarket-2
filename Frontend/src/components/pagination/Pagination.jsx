import { useContext } from "react";
import "../pagination/pagination.css";
import { TbChevronRightPipe } from "react-icons/tb";
import { TbChevronLeftPipe } from "react-icons/tb";
import { TbChevronRight } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import { ProductContext } from "../../context/ProductContext";

export function Pagination() {
  const { prevPage, nextPage, totalPage, page, setPage, limit } =
    useContext(ProductContext);

  const handleNext = () => {
    if (totalPage < 12) {
      return;
    } else {
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

  return (
    <section className="pagination__container">
      <hr className="" />
      <div className="flex flex-col sm:flex-row items-center mt-2 gap-2">
        <span className="text-sm">
          items por página <span className="font-medium">{totalPage}</span>{" "}
        </span>
        <div className=" flex items-center gap-1 sm:gap-3">
          <TbChevronLeftPipe
            onClick={handleFirstPage}
            className={`pagination__arrow pagination__arrow__prev ${
              page === 1 ? "text-gray-400 hover:bg-none" : ""
            }`}
          />
          <TbChevronLeft
            onClick={handlePrev}
            className={`pagination__arrow pagination__arrow__prev ${
              page === 1 ? "text-gray-400" : ""
            }`}
          />
          <span className="font-medium">{page}</span>
          <TbChevronRight
            onClick={handleNext}
            className={`pagination__arrow pagination__arrow__prev ${
              totalPage < 12 ? "text-gray-400 hover:bg-none" : ""
            }`}
          />
          <TbChevronRightPipe
            className={`pagination__arrow pagination__arrow__prev ${
              totalPage < 12 ? "text-gray-400 hover:bg-none" : ""
            }`}
          />
        </div>
      </div>
    </section>
  );
}
