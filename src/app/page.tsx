"use client";
import Register from "./register/page"; // Import Register component
import Login from "./login/page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "@/components/homepage/Homepage";

export default function Page() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
