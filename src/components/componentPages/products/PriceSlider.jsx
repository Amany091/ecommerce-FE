import React, { useState } from 'react'
import { Slider } from '@mui/material'
import AccordionUI from '../../ui/AccordionUI'

function value(price) {
    return `${price}$`
}
const PriceSlider = ({selectedPriceRange, setSelectedPriceRange}) => {
    const [price, setPrice] = useState([0, 1000]);

    const handleChangeOnPrice = (event, price) => {
        if (price === selectedPriceRange) {
            // If the selected size is clicked again, clear the selection
            setSelectedPriceRange(null)
        } else {
            // Otherwise, set the new size
            setSelectedPriceRange(price)
            setPrice(price);
        }
    }

    return (
        <AccordionUI title={'Price'} >
            <Slider
                value={price}
                onChange={handleChangeOnPrice}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={value}
                min={0}
                max={1000}
            />
        </AccordionUI>
    )
}

export default PriceSlider
