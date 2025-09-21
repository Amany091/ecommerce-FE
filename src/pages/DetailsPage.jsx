import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../components/componentPages/details/Carousel";
import ProductDetails from "../components/componentPages/details/ProductDetails";
import RelatedProducts from "../components/componentPages/details/RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductItem } from "../features/productsSlice";
import BreadCrumb from "../components/ui/BreadCrumb";
import ProductReview from "../components/componentPages/details/ProductReview";

const DetailsPage = () => {

  const { id } = useParams()
  const data = useSelector(state => state.products)
  const product = data?.item?.data ?? {};
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchProductItem(id))
  },[id])

  return (
    <section>
      <div className="container">
        {/* product path */}
        <BreadCrumb/>
        {/* product details */}
        <div className="p-3 grid md:grid-cols-[1fr_2fr] lg:grid-col-[1fr_2fr] grid-cols-1">
          {/* left side */}
          <Carousel images={product?.images} isLoading={data?.loading} />
          {/* right side */}
          <div>
            <ProductDetails />
          </div>
        </div>
      </div>
      {/* product review */}
      <ProductReview/>
      {/* related products */}
      <div>
        <RelatedProducts />
      </div>
    </section>
    
  );
};

export default DetailsPage;
