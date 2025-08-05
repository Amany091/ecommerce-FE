import React from 'react'
import { MdArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const CurrentPath = ({ currentPath }) => {
  return (
    <div className='flex gap-3 mt-5'>
      <NavLink className={"text-descriptionColor font-inter"} to={"/"} >Home <MdArrowRight className='inline' /> </NavLink>
      {currentPath.map((current, index) => {
        const textColor = index === currentPath.length - 1 ? 'text-black' : 'text-descriptionColor'
        if (index <= currentPath.length - 1) {
          return (
            <NavLink key={index} className={`font-inter ${textColor}`} >
              {current}
              <MdArrowRight className='inline' />
            </NavLink>
          )
        }
      })}
    </div>
  )
}

export default CurrentPath
