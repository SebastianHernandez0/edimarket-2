import "../pagination/pagination.css";
import { TbChevronRightPipe } from "react-icons/tb";
import { TbChevronLeftPipe } from "react-icons/tb";
import { TbChevronRight } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";

export function Pagination() {
  return (
    <section className="pagination__container">
      <hr className="" />
      <div className="flex flex-col sm:flex-row items-center mt-2 gap-2">
        <span className="text-sm">
          items por página <span className="font-medium">20</span>{" "}
        </span>
        <div className=" flex gap-1 sm:gap-3">
          <TbChevronLeftPipe className="paginaction__arrow pagination__arrow__first" />
          <TbChevronLeft className="paginaction__arrow pagination__arrow__prev" />
          <TbChevronRight className="paginaction__arrow pagination__arrow__next" />
          <TbChevronRightPipe className="paginaction__arrow pagination__arrow__last" />
        </div>
      </div>
    </section>
  );
}
