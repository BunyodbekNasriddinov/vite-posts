import { Route, Routes } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { PublicHeader } from "../components/PublicHeader/PublicHeader";
import { Register } from "../components/Register/Register";
import { Posts } from "../pages/Posts/Posts";

export const Public = () => {
  return (
    <div>
      <PublicHeader />
      <Routes>
        <Route index path="/" element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};
