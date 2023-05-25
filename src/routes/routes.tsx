import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { HomePage } from "../pages/Home";
import { ProtectedRoutes } from "../components/Protected";

export const RoutesApp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
