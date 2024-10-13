import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";
import { TLike, TLikeInfo } from "../../types/TypesLike.js";
interface initialState {
  likeItem: TLike | null;
}
const initialState: initialState = {
  likeItem: null,
};

export const fetchAddLike = createAsyncThunk<TLike, TLikeInfo>(
  "comment/fetchAddLike",
  async (likeInfo) => {
    const { data } = await axios.post(`/api/likes/like`, likeInfo);
    return data;
  }
);

const likesSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    unLike: (state) => {
      state.likeItem = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAddLike.pending, (state) => {
      state.likeItem = null;
    });

    builder.addCase(fetchAddLike.fulfilled, (state, action) => {
      state.likeItem = action.payload;
    });

    builder.addCase(fetchAddLike.rejected, (state) => {
      state.likeItem = null;
    });
  },
});

export const likesReducer = likesSlice.reducer;
export const { unLike } = likesSlice.actions;
