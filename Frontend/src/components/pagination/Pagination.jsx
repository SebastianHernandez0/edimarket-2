import "../pagination/pagination.css";
import { TbChevronRightPipe } from "react-icons/tb";
import { TbChevronLeftPipe } from "react-icons/tb";
import { TbChevronRight } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";

export function Pagination() {
  return (
    <section className="pagination__container">
      <div className="flex items-center gap-3">
        <TbChevronLeftPipe className="paginaction__arrow" />
        <TbChevronLeft className="paginaction__arrow" />
        <TbChevronRight className="paginaction__arrow" />
        <TbChevronRightPipe className="paginaction__arrow" />
      </div>
    </section>
  );
}
