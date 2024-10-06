import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/Auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { postsReducer } from "./slices/Posts";

export const store = configureStore({
  reducer: { auth: authReducer, posts: postsReducer },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;