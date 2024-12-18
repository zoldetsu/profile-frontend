import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/Auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { postsReducer } from "./slices/Posts";
import { commentReducer } from "./slices/Comments";
import { likesReducer } from "./slices/Likes";
import { followReducer } from "./slices/Follow";
import { SwitchThemeReducer } from "./slices/SwitchTheme";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comment: commentReducer,
    like: likesReducer,
    follow: followReducer,
    SwitchTheme: SwitchThemeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
