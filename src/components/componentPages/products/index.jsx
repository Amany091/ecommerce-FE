
import { useEffect, useRef, useState } from "react";
import LoaderSpinner from "../../ui/LoaderSpinner";
import SingleProduct from "./SingleProduct";
import FilterLayout from "./FilterLayout";
import Pagination from "../../ui/Pagination";
import { useDispatch, useSelector } from "react-redux";
import FilterImage from "./FilterImage";
import { fetchProductsData, productsActions } from "../../../features/productsSlice";

export default function AllProducts(props) {
  const {  onFilterClick, filters, setFilters } = props
  const [page, setPage] = useState(1)
  const data = useSelector((state)=> state.products)
  const products = data?.data?.products ?? []
  const pagination = data?.data?.pagination
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch()

  const onChangePage = (newPage)=>{
    setPage(newPage)
    dispatch(productsActions.setFilters({key: 'page', value: newPage}));
    dispatch(fetchProductsData({params: {...filters, page: newPage, limit: pagination?.limit}}))
  }

  useEffect(()=>{
    dispatch(fetchProductsData({params: {page, limit: pagination?.limit, ...filters}}))
  },[page, dispatch])

  return (
    <>
      <div className="my-5 grid lg:grid-cols-[275px,1fr] md:grid-cols-[275px,1fr] grid-cols-1 gap-5 realtive">
        <FilterLayout 
          onFilterClick={onFilterClick} 
          filters={filters}
          setFilters={setFilters}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        <div className="lg:mb-12">
          <FilterImage isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
          <div>
            {data?.loading ? <LoaderSpinner/> : (
              <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-x-5 gap-y-10">
              {
                products?.length > 0 ? (
                  products?.map((product) => (
                  <SingleProduct product={product} key={product?._id}/>
                ))
                ) : (<p className="text-center col-span-full">No products found</p>
                )
              }
            </div>
            )}
          </div>
          <hr className="border border-b-[1px] mt-10" />
           <Pagination 
            total={pagination?.total} 
            page={page}
            changePage={onChangePage}
            hasNextPage={pagination?.hasNextPage}
            hasPrevPage={pagination?.hasPrevPage}
            totalPages={pagination?.totalPages}
          />
        </div>
      </div>
    </>
  )
};