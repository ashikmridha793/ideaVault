"use client";

import { useRef } from "react";
import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
  const myRef = useRef(null)

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  );
}
