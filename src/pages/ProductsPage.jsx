import React, { useEffect, useState } from 'react'
import CurrentPath from '../components/ui/CurrentPath'
import AllProducts from '../components/componentPages/products/AllProducts'
import { useParams, useSearchParams } from 'react-router-dom'
import { useGetProductsQuery } from '../redux/RTK/productsApi'

const ProductsPage = () => {
    const { id } = useParams()
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedPriceRange, setSelectedPriceRange] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [shouldFetch, setShouldFetch] = useState(true)

    const queryParams  = {
        size: selectedSize,
        color: selectedColor,
        category: selectedCategory,
        minPrice: selectedPriceRange ? selectedPriceRange[0] : '',
        maxPrice: selectedPriceRange ? selectedPriceRange[1] : '',
    };
    
    const { data: products, isSuccess , isLoading} = useGetProductsQuery(queryParams, {
        skip: !shouldFetch,
        refetchOnMountOrArgChange: true
    })

    const handleFilterClick = () => {
        setShouldFetch(true)
        if (selectedSize) queryParams.size = selectedSize;
        if (selectedColor) queryParams.color = selectedColor;
        if (selectedCategory) queryParams.category = selectedCategory;
        if (selectedPriceRange !== null) {
            queryParams.minPrice = selectedPriceRange[0];
            queryParams.maxPrice = selectedPriceRange[1];
        }

        // Update the URL with the selected filters using setSearchParams
        setSearchParams(queryParams)
        if (isFilterOpen) {
            setIsFilterOpen(false);
        } else {
            return
        }
    }
    
    useEffect(() => {
        setShouldFetch(true)
    }, [])
    
    useEffect(() => {
        // controle of filtering data 
        if (isSuccess) setShouldFetch(false)
    },[isSuccess])

    return (
        <section>
            <div className="container">
                <CurrentPath currentPath={['products']} />
                <AllProducts
                    isFilterOpen={isFilterOpen}
                    setIsFilterOpen={setIsFilterOpen}
                    onFilterClick={handleFilterClick}
                    products={products}
                    isLoading={isLoading}
                    setSelectedColor={setSelectedColor}
                    setSelectedSize={setSelectedSize}
                    setSelectedPriceRange={setSelectedPriceRange}
                    selectedPriceRange={selectedPriceRange}
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                />
            </div>
        </section>
    )
}

export default ProductsPage
