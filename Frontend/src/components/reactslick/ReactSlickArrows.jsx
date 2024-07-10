import "../reactslick/slickSlider.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowForward
      onClick={onClick}
      style={{ ...style, display: "block" }}
      className={`${className} arrow`}
    />
  );
}

export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowBack
      className={`${className} arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
