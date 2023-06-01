"use client";

import { Toaster } from "react-hot-toast"
import React from 'react'


const ToasterProvider = () => {
    return (
        <Toaster toastOptions={{
            duration: 3000,
          }}/>
    )
}

export default ToasterProvider