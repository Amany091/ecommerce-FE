import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {fetchCategory } from "../features/categoriesSlice";
import Card from "../components/ui/Card";
import LoaderSpinner from "../components/ui/LoaderSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../features/productsSlice";
import BreadCrumb from "../components/ui/BreadCrumb";

function CategoryPage() {
  const {id} = useParams();
  const data = useSelector((state)=> state.products);
  const products = data?.data?.products;
  const {item: category} = useSelector((state)=> state.categories);
  const productsBasedCat = products?.filter((product)=> product.category.name === category?.name) ?? [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsData())
    dispatch(fetchCategory(id))
  },[id])

  return (
    <div className=" container mb-40">
      <BreadCrumb/>
      <h1 className="mt-10 text-[28px] font-semibold">{category?.name}</h1>
        {data?.loading ? <LoaderSpinner/> : 
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-7 mt-5 ">
          {productsBasedCat.map((prod) => (
            <Card
              imageSrc={prod?.imgCover}
              imageAlt={prod?.title}
              cardTitle={prod?.title}
              price={prod?.price}
              priceAfterDiscount={prod?.priceAfterDiscount}
              key={prod?._id}
              rate={prod?.ratingsAverage}
            />
          ))}
      </div>
        }
    </div>
  );
}

export default CategoryPage;
