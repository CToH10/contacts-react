import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { HomePage } from "../pages/Home";

export const RoutesApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
