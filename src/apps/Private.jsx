import { Route, Routes } from "react-router-dom";
import { Modal } from "../components/Modal/Modal";
import { PrivateHeader } from "../components/PrivateHeader/PrivateHeader";
import { Posts } from "../pages/Posts/Posts";
import { Users } from "../pages/Users/Users";

export const Private = () => {
  return (
    <>
      <PrivateHeader />

      <Routes>
        <Route index={true} path="/" element={<Posts />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
};
