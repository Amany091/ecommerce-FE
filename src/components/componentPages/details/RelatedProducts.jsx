import Card from "../../ui/Card";
import { useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../../../features/productsSlice";

function RelatedProducts() {
  const dispatch = useDispatch()
  const data = useSelector((state)=> state.products);
    const products = data?.data?.products ?? [];
  const shuffledData = shuffleProducts(products)

  function shuffleProducts(data) {
    if (!data) return [];
    const prods = [...data];
    for (let i = prods.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [prods[i], prods[j]] = [prods[j], prods[i]];
    }
    return prods;
  }

  useEffect(()=>{
    dispatch(fetchProductsData())
  },[])

  return (
    <div className="container mt-20 md:mb-20 lg:mb-32">
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-8">
      {shuffledData.slice(0,4).map((card) => (
          <SwiperSlide key={card._id}>
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
