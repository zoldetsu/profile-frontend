import { Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Аuthentication from "./pages/Аuthentication";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import PageProfile from "./pages/PageProfile";
import { fetchAuthMe } from "./redux/slices/Auth";
import { useAppDispatch, useAppSelector } from "./redux/store";
import PageFollowing from "./pages/PageFollowing";
import PageFollowers from "./pages/PageFollowers";
import Loader from "./UI/Loader";
import Layout from "./components/Layout";
import { RequireAuth } from "./hoc/RequireAuth";
function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="auth" element={<Аuthentication />} />
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="posts/:id"
            element={
              <RequireAuth>
                <PostPage />
              </RequireAuth>
            }
          />
          <Route
            path="users/:id"
            element={
              <RequireAuth>
                <PageProfile />
              </RequireAuth>
            }
          />
          <Route
            path="following"
            element={
              <RequireAuth>
                <PageFollowing />
              </RequireAuth>
            }
          />
          <Route
            path="followers"
            element={
              <RequireAuth>
                <PageFollowers />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
