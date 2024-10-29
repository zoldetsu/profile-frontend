import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: JSON.parse(localStorage.getItem("mode")) || "light",
};

const SwitchThemeSlice = createSlice({
  name: "SwitchTheme",
  initialState,
  reducers: {
    switches: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("mode", JSON.stringify(state.theme));
    },
  },
});

export const { switches } = SwitchThemeSlice.actions;
export const SwitchThemeReducer = SwitchThemeSlice.reducer;
