import React from 'react'

const Drag = ({ containerRef, children }) => {
    const handleDragScroll = (e) => {
        const slider = containerRef.current
        let scrollLeft, startX, isDown = false;
        // for large scrren mouse drag
        slider.addEventListener("mousedown", (e) => {
            isDown = true
            slider.classList.add("drag")
            startX = e.pageX - slider.offsetLeft
            scrollLeft = slider.scrollLeft
        })

        slider.addEventListener("mouseleave", () => {
            isDown = false
            slider.classList.remove("drag")
        })

        slider.addEventListener("mouseup", () => {
            isDown = false
            slider.classList.remove("drag")
        })

        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - slider.offsetLeft
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk
        })

        // for mobile drag touch
        slider.addEventListener("touchstart", (e) => {
            isDown = true
            slider.classList.add("drag")
            startX = e.touches[0].pageX - slider.offsetLeft
            scrollLeft = slider.scrollLeft
        })

        slider.addEventListener("touchend", () => {
            isDown = false
            slider.classList.remove("drag")
        })

        slider.addEventListener("touchmove", (e) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.touches[0].pageX - slider.offsetLeft
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk
        })
    }
    return (
        <div className={`relative container md:max-w-full cursor-pointer select-none`}>
            <div className="flex gap-6 flex-nowrap overflow-x-hidden scroll-smooth snap-x snap-mandatory " ref={containerRef} onMouseDown={handleDragScroll}  >
                {children}
            </div>

        </div>
    )
}

export default Drag
