import React from 'react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import "../../index.css"


export const ToastSuccess = (message) => {
    return toast.success(message, {
        className: "toast_Success"
    });
};

export const ToastError = (message) => {
    return toast.error(message, {
        className: "toast_Error"
    })
};
