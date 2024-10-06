import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Аuthentication from "./pages/Аuthentication";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import { fetchAuthMe } from "./redux/slices/Auth";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Аuthentication />} />
      </Routes>
    </>
  );
}

export default App;
