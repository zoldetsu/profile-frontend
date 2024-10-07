import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";
import { TUser } from "../../types/TypesPost.js";

interface IRegisterParams {
  fullName: string;
  email: string;
  password: string;
}

interface ILoginParams {
  email: string;
  password: string;
}

interface IState {
  data: TUser | null;
  status: string;
}

const initialState: IState = {
  data: null,
  status: "loading",
};

export const fetchRegister = createAsyncThunk<TUser, IRegisterParams>(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/api/user/register", params);
    return data;
  }
);

export const fetchLogin = createAsyncThunk<TUser, ILoginParams>(
  "auth/fetchLogin",
  async (params) => {
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
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });

    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });

    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchLogin.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });

    builder.addCase(fetchLogin.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });

    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });

    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
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
