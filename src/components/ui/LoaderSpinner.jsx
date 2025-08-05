import React from 'react'
import {ThreeDots} from "react-loader-spinner"
import { useSelector } from 'react-redux'
const LoaderSpinner = () => {

    const {theme} = useSelector((state) => state.theme)
    return (
        <div className="flex justify-center items-center w-full">
            <ThreeDots
                visible={true}
                height="40"
                width="40"
                color={`${theme === "dark" ? '#fff': '#00000'}`}
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default LoaderSpinner
