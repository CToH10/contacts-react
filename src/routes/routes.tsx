import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "../pages/Login";

export const RoutesApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
