import Card from "../../ui/Card";
import { useState } from "react";
import useWindowWidth from "../../../customHooks/useWindowWidth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../../redux/RTK/productsApi";
import LoaderSpinner from "../../ui/LoaderSpinner";

function Cards() {

  const { data: products, isLoading } = useGetProductsQuery()
  const newProducts = products?.filter(product => new Date(product.updatedAt).getMonth() - 1 >= new Date(product.createdAt).getMonth() <= new Date(product.createdAt).getMonth() + 1)


  return (
    <div>
      {isLoading ? <LoaderSpinner /> :
        <Swiper
          navigation={false}
          modules={[Navigation]}
          className="mySwiper"
          spaceBetween={10}
          loop={false}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 4,
            },
          }}
        >
          {newProducts?.map((card, index) => (
            <div>
              <SwiperSlide key={`${card.id}-${index}`}>
                <Link to={`/products/${card._id}`}>
                  <Card
                    imageSrc={card.imgCover}
                    imageAlt={card.name}
                    cardTitle={card.title}
                    price={card.price}
                    priceAfterDiscount={card.priceAfterDiscount}
                    rate={card.ratingsAverage}

                  />
                </Link>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      }
    </div>

  );
}

export default Cards;
