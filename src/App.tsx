import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Аuthentication from "./pages/Аuthentication";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import PageProfile from "./pages/PageProfile";
import { fetchAuthMe } from "./redux/slices/Auth";
import { useAppDispatch } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Аuthentication />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/auth" element={<Аuthentication />} />
        <Route path="/users/:id" element={<PageProfile />} />
      </Routes>
    </>
  );
}

export default App;
