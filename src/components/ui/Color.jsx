import { useState } from 'react'
import { MdCheck } from 'react-icons/md'

const Color = ({  color, setFilter }) => {
    const [selectedColor, setSelectedColor] = useState('');           
    const  colors=['red', 'green', 'black', 'gold', 'blue', 'navy'];

    const handleColorClick = (value) => {
        if (color === value) {
            // If the selected size is clicked again, clear the selection
            setSelectedColor(null)
        } else {
            // Otherwise, set the new size
            setFilter("color", value)
            setSelectedColor(value)
        }
    };

    return (
        <div className="flex gap-2 flex-wrap ">
            {colors?.map((color, index) => (
                <div
                    key={index}
                    className={`rounded-full border border-slate-400/30 w-[37px] h-[37px] flex items-center justify-center cursor-pointer`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                >
                    {selectedColor === color && <MdCheck className={` ${color === "#FFFFFF" ? "text-slate-400/30" : "text-white"} `} />}
                </div>
            ))}
        </div>
    )
}

export default Color
