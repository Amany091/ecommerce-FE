import React, { useRef, useEffect } from 'react'
import { createPortal } from "react-dom"

const Modal = ({children}) => {
    const modalRef = useRef(null)
    if (!modalRef.current) {
        modalRef.current = document.createElement('div')
    }

    useEffect(() => {
        const modalRoot = document.getElementById('modal')
        modalRoot.appendChild(modalRef.current)
        return(() => modalRoot.removeChild(modalRef.current))
    }, [])
    
    return createPortal(children, modalRef.current)
  
}

export default Modal
