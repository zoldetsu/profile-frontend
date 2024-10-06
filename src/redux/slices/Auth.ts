import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";
interface IRegisterParams {
  fullName: string;
  email: string;
  password: string;
}

interface ILoginParams {
  email: string;
  password: string;
}

const initialState = {
  data: [] ,
  status: "loading",
};

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: IRegisterParams) => {
    const { data } = await axios.post("/api/user/register", params);
    return data;
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params: ILoginParams) => {
    const { data } = await axios.post("/api/user/login", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/api/user/me");
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = [];
    });

    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });

    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = [];
      state.status = "error";
    });

    builder.addCase(fetchLogin.pending, (state) => {
      state.status = "loading";
      state.data = [];
    });

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });

    builder.addCase(fetchLogin.rejected, (state) => {
      state.data = [];
      state.status = "error";
    });

    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = "loading";
      state.data = [];
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });

    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = [];
      state.status = "error";
    });
  },
});

// export const selectIsAuth = (state: { auth: { data: IRegisterParams } }) => {
//   Boolean(state.auth.data);
// };

export const selectIsAuth = (state: { auth: { data: IRegisterParams } }) =>
  Boolean(state.auth.data);
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
