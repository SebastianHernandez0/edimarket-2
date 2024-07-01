import { useContext } from "react";
import "../pagination/pagination.css";
import { TbChevronRightPipe } from "react-icons/tb";
import { TbChevronLeftPipe } from "react-icons/tb";
import { TbChevronRight } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import { ProductContext } from "../../context/ProductContext";

export function Pagination() {
  const { prevPage, nextPage, totalPage, page, setPage } =
    useContext(ProductContext);

  const handleNext = () => {
    if (totalPage !== 0) {
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
            className="paginaction__arrow pagination__arrow__first"
          />
          <TbChevronLeft
            onClick={handlePrev}
            className="paginaction__arrow pagination__arrow__prev"
          />
          <span className="">{page}</span>
          <TbChevronRight
            onClick={handleNext}
            className="paginaction__arrow pagination__arrow__next"
          />
          <TbChevronRightPipe className="paginaction__arrow pagination__arrow__last" />
        </div>
      </div>
    </section>
  );
}
