import { Slider } from '@mui/material'
import AccordionUI from '../../ui/AccordionUI'

function value(price) {
    return `${price}$`
}

const PriceSlider = ({setFilter, priceRange}) => {
    return (
        <AccordionUI title={'Price'} >
            <Slider
                value={[priceRange.minPrice, priceRange.maxPrice]}
                onChange={(e, value)=> setFilter("priceRange", {minPrice: value[0], maxPrice: value[1]})}
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
