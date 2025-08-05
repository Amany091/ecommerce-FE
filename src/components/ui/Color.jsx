import React, { useState } from 'react'
import { MdCheck } from 'react-icons/md'

const Color = ({ colors, selectedColor, setSelectedColor }) => {
    const [check, setCheck] = useState(-1);

    const handleColorClick = (color, index) => {
        if (color === selectedColor) {
            // If the selected size is clicked again, clear the selection
            setSelectedColor(null)
            setCheck(-1)
        } else {
            // Otherwise, set the new size
           setSelectedColor(color)
            setCheck(index)
        }
    };

    return (
        <div className="flex gap-2 flex-wrap ">
            {colors?.map((color, index) => (
                <div
                    key={index}
                    className={`rounded-full border border-slate-400/30 w-[37px] h-[37px] flex items-center justify-center cursor-pointer`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color, index)}
                >
                    {selectedColor === color && <MdCheck className={` ${color === "#FFFFFF" ? "text-slate-400/30" : "text-white"} `} />}
                </div>
            ))}
        </div>
    )
}

export default Color
