import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import ImageCarousel from "./components/ImageCarousel";

export default function() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Homepage />} />
            <Route path="imageCarousel" element={<ImageCarousel />} />
        </Routes>
    </BrowserRouter>
  );
}
