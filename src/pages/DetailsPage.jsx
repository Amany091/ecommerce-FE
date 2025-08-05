import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import ReviewCard from "../components/ui/ReviewCard";
import Carousel from "../components/componentPages/details/Carousel";
import ProductDetails from "../components/componentPages/details/ProductDetails";
import RelatedProducts from "../components/componentPages/details/RelatedProducts";
import CurrentPath from "../components/ui/CurrentPath";
import { useDispatch } from "react-redux";
import { useGetProductMutation } from "../redux/RTK/productsApi";

const DetailsPage = () => {
  const [check, setCheck] = useState(0);
  const [viewAll, setViewAll] = useState(false)
  const { id } = useParams()
  const [setProduct, { data: product , isLoading}] = useGetProductMutation();
  
  useEffect(() => {
    setProduct(id)
  },[id])

  return (
    <section>
      <div className="container">
        {/* product path */}
        <CurrentPath currentPath={["shop", product?.title]} />
        {/* product details */}
        <div className="p-3 grid md:grid-cols-[1fr_2fr] lg:grid-col-[1fr_2fr] grid-cols-1">
          {/* left side */}
          <Carousel images={product?.images} isLoading={isLoading} />
          {/* right side */}
          <div>
            <ProductDetails
              product={product}
            />
          </div>
        </div>
      </div>
      {/* product review */}
      <div className="container">
        <div className="flex justify-between px-2 items-center my-3">
          <h5 className="font-bold font-inter">
            All Reviews <span className="text-descriptionColor">(451)</span>{" "}
          </h5>
          <div className="flex gap-1">
            <button className=" bg-inputBackground w-[120px] lg:p-quantityLg lg:flex hidden  items-center gap-2 font-bold rounded-[62px] dark:text-black">
              Latest <IoIosArrowDown />{" "}
            </button>
            <button className=" rounded-buttonRadius lg:p-quantityLg p-quantitySm bg-buttonBackground text-buttonColor">
              write a review
            </button>
          </div>
        </div>
        {/* list testmonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {viewAll ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ReviewCard key={index} comment="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt" postDate="Posted on August 14, 2023" name="Samantha Co." />
            ))
          ) : (
            Array.from({ length: 5 }).slice(3).map((_, index) => (
              <ReviewCard key={index} comment="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt" postDate="Posted on August 14, 2023" name="Samantha Co." />
            ))
          )}
        </div>
        <button className="bg-white p-buttonPadding border border-solid border-whiteBtnBorderColor rounded-buttonRadius mx-auto block my-4 font-bold dark:text-black " onClick={() => setViewAll(!viewAll)} >{!viewAll ? "Load more reviews" : "Load less reviews"}</button>
      </div>
      {/* related products */}
      <div>
        <RelatedProducts />
      </div>
    </section>
  );
};

export default DetailsPage;
