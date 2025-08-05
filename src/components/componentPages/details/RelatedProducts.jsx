import Card from "../../ui/Card";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useGetProductsQuery } from "../../../redux/RTK/productsApi";

function RelatedProducts() {

  const { data: products, isSuccess } = useGetProductsQuery({}, {
    refetchOnFocus: true
  })
  const [productsList, setProductsList] = useState([])
  const shuffledData = shuffleProducts([...productsList])


  function shuffleProducts(data) {
    const prods = data
    for (let i = prods?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [prods[i], prods[j]] = [prods[j], prods[i]];
    }
    return data
  }

  useEffect(() => {
    if (isSuccess) setProductsList([...products])
  }, [isSuccess])


  return (
    <div className="container mt-20 md:mb-20 lg:mb-32">
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-8">
      {shuffledData.slice(0,4).map((card) => (
          <SwiperSlide key={card.id}>
            <Card
              imageSrc={card.imgCover}
              imageAlt={card.title}
              cardTitle={card.title}
              priceAfterDiscount={card.priceAfterDiscount}
              price={card.price}
            />
          </SwiperSlide>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
