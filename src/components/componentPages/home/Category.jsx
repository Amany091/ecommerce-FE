import React from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../redux/RTK/categoriesApi";

const Category = () => {
  const { data: categories } = useGetCategoriesQuery()

  return (
    <div className=" container bg-cardBackground dark:bg-dark p-8 mx-auto rounded-xl shadow-lg my-20 ">
      <h2 className="text-center text-3xl font-bold font-cairo mb-10">
        BROWSE BY DRESS STYLE
      </h2>
      <div className="w-4/5 mx-auto">
      <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full justify-center ">
        {categories?.slice(0, 2).map((category) => (
          <Link to={`category/${category.id}`} key={category._id}>
              <img className="object-contain sm:w-[100vw] lg:w-full md:w-[100vw]" src={category.image} alt={category.name} />   
          </Link>
        ))}
      </div>
      <div className="flex gap-2 mt-2 flex-wrap lg:flex-nowrap w-full justify-center">
        {categories?.slice(2, 4).map((category) => (
          <Link to={`category/${category.id}`} key={category.id} >
              <img src={category.image} alt={category.name} className="sm:w-[100vw] md:w-[100vw] lg:w-full" />
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};
export default Category;
