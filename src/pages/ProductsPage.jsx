import { useState } from 'react'

import BreadCrumb from '../components/ui/BreadCrumb'
import { useDispatch } from 'react-redux'
import {fetchProductsData } from '../features/productsSlice'
import AllProducts from '../components/componentPages/products/index'

const ProductsPage = () => {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({ category: '', color: "", size: "", priceRange:0 });

    const handleFilterClick = () => {
        const payload = {...filters, page: 1}

        if(filters.priceRange){
            payload.minPrice = payload.priceRange.minPrice,
            payload.maxPrice = payload.priceRange.maxPrice
            delete payload.priceRange
        }
        dispatch(fetchProductsData({params: payload}))
    }

    return (
        <section>
            <div className="container">
                <BreadCrumb/>
                <AllProducts
                    onFilterClick={handleFilterClick}
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>
        </section>
    )
}

export default ProductsPage
