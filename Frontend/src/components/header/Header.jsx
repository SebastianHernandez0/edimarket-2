import "../header/header.css";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export function Header() {
  const images = [
    {
      original: "/imgs/aplication/slider_1.webp",
      thumbnail: "/imgs/aplication/slider_1.webp",
      originalHeight: 300, // Alto en píxeles
      originalWidth: 400,  // Ancho en píxeles
    },
    {
      original: "/imgs/aplication/slider_2.gif",
      thumbnail: "/imgs/aplication/slider_2.gif",
    },
    {
      original: "/imgs/aplication/slider_3.jpg",
      thumbnail: "/imgs/aplication/slider_3.jpg",
    },
    {
      original: "/imgs/aplication/slider_4.png",
      thumbnail: "/imgs/aplication/slider_4.png",
    },
    {
      original: "/imgs/aplication/slider_5.webp",
      thumbnail: "/imgs/aplication/slider_5.webp",
    },
  ];

  return (
    <header className="header__container">
      <div className="slider__container">
        <ImageGallery
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={false}
          items={images}
          showBullets={true}
          autoPlay={true}
          slideInterval={5000}
          slideDuration={1000}
        />
      </div>
    </header>
  );
}
