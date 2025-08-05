import ImageOne from "../../../assets/images/image-7.png";
import Card from "../../ui/Card";
import { useState } from "react";
import useWindowWidth from "../../../customHooks/useWindowWidth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Title from "../../ui/Title";
import { Link } from "react-router-dom";

function TopSellingCards({ products }) {
  const productsWithHigherRate = products?.filter((product) => product.ratingsAverage > 3)
  const [viewAll, setViewAll] = useState(false);
  const windowWidth = useWindowWidth();

  const handleViewAll = () => {
    setViewAll(true);
  };

  const handleShowLess = () => {
    setViewAll(false);
  };

  return (
    <div className="container">
      <Title title={"Top Selling"} className={"text-center "} />
      {windowWidth > 768 ? (
        <div className="cards grid lg:grid-cols-4 md:grid-cols-3 gap-x-5 gap-y-10 justify-self-center ">
          {productsWithHigherRate?.length <= 3 && !viewAll ?
            productsWithHigherRate.map((prod, index) => (
              <div key={`${prod.id}-${index}`} className="card">
                <Link to={`/products/${prod._id}`}>
                  <Card
                    imageSrc={prod.imgCover}
                    imageAlt={prod.title}
                    cardTitle={prod.title}
                    price={prod.price}
                    priceAfterDiscount={prod.priceAfterDiscount}
                    rate={prod.ratingsAverage}
                  />
                </Link>
              </div>
            )) :
            productsWithHigherRate?.slice(3).map((prod) => (
              <div key={prod.id} className="card">
                <Link to={`/products/${prod._id}`}>
                  <Card
                    imageSrc={prod.imgCover}
                    imageAlt={prod.title}
                    cardTitle={prod.title}
                    price={prod.price}
                    priceAfterDiscount={prod.priceAfterDiscount}
                    rate={prod.ratingsAverage}
                  />
                </Link>
              </div>
            ))
          }
        </div>
      ) : (
          <Swiper
          navigation={false}
          modules={[Navigation]}
          className="mySwiper"
          spaceBetween={10}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
          }}
        >
          {products?.map((card, index) => (
            <SwiperSlide key={`${card.id}-${index}`}>
              <Card
                imageSrc={card.imgCover}
                imageAlt={card.title}
                cardTitle={card.title}
                price={card.price}
                priceAfterDiscount={card.priceAfterDiscount}
                rate={card.ratingsAverage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {windowWidth > 768 && productsWithHigherRate?.length > 4 && !viewAll && (
        <div className="flex justify-center pb-3 pt-10">
          <button
            className="bg-white p-buttonPadding border border-solid border-whiteBtnBorderColor rounded-buttonRadius"
            onClick={handleViewAll}
          >
            View All
          </button>
        </div>
      )}
      {windowWidth > 768 && productsWithHigherRate?.length > 4 && viewAll && (
        <div className="flex justify-center pb-3 pt-10">
          <button
            className="bg-white p-buttonPadding border border-solid border-whiteBtnBorderColor rounded-buttonRadius"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        </div>
      )
      }


    </div>
  );
}

export default TopSellingCards;
