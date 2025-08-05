import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCategoryMutation } from "../redux/RTK/categoriesApi";
import { useGetProductsQuery } from "../redux/RTK/productsApi";
import CurrentPath from "../components/ui/CurrentPath";
import Card from "../components/ui/Card";
import LoaderSpinner from "../components/ui/LoaderSpinner";

function CategoryPage() {
  const {id} = useParams();
  const [setCategory, { data: cat }] = useGetCategoryMutation();
  const { data: products, isLoading } = useGetProductsQuery()
  const data = products?.filter((product)=> product.category.name === cat?.name) ?? []
  console.log(data)

  useEffect(() => {
    setCategory(id)
  },[id])

  return (
    <div className=" container mb-40">
      <CurrentPath currentPath={[cat?.name]}  />
      <h1 className="mt-10 text-[28px] font-semibold">{cat?.name}</h1>
        {isLoading ? <LoaderSpinner/> : 
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-7 mt-5 ">
          {data.map((prod) => (
            <Card
              imageSrc={prod.imgCover}
              imageAlt={prod.title}
              cardTitle={prod.title}
              price={prod.price}
              priceAfterDiscount={prod.priceAfterDiscount}
              key={prod._id}
              rate={prod.ratingsAverage}
            />
          ))}
      </div>
        }
    </div>
  );
}

export default CategoryPage;
