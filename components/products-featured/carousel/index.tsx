import ProductItem from "./../../product-item";
import { ProductType, ProductTypeList } from "types";

// import Swiper core and required components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import { useWindowSize } from "components/header/useWindowSize";

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if (window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if (window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 30;
    centeredSlides = false;
  }
}

export type ProductsCarouselType = {
  products: ProductType[];
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  if (!products) return <div>Loading</div>;
  const swiperRef = useRef();
  const size = useWindowSize();
  return (
    <div className="products-carousel">
      {size.width > 1024 && (
        <button className="mr-6" onClick={() => swiperRef.current?.slidePrev()}>
          <i className="icon-left" />
        </button>
      )}
      <Swiper
        spaceBetween={spaceBetween}
        loop={false}
        centeredSlides={centeredSlides}
        watchOverflow={true}
        slidesPerView={slidesPerView}
        className="swiper-wrapper"
        // modules={[Navigation]}
        // navigation={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {products.map((item, index) => (
          <SwiperSlide key={item?.id + index}>
            <ProductItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {size.width > 1024 && (
        <button className="ml-6" onClick={() => swiperRef.current?.slideNext()}>
          <i className="icon-right" />
        </button>
      )}
    </div>
  );
};

export default ProductsCarousel;
