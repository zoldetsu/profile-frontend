import { TComment } from "./../../types/TypesComment";
import { RootState } from "./../store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios.js";
import { TAddComment } from "../../types/TypesComment.js";
interface initialState {
  oneComment: {
    status: string;
    items: TComment | null;
  };
  allComment: {
    status: string;
    items: TComment[];
  };
}

const initialState: initialState = {
  oneComment: {
    status: "loading",
    items: null,
  },
  allComment: {
    status: "loading",
    items: [],
  },
};

export const fetchAddComment = createAsyncThunk<TComment, TAddComment>(
  "comment/fetchAddComment",
  async (commentInfo) => {
    const { data } = await axios.post(`/api/comment/add`, commentInfo);
    return data;
  }
);
export const fetchGetComments = createAsyncThunk<TComment[], string>(
  "comment/fetchGetComments",
  async (id) => {
    const { data } = await axios.get<TComment[]>(`/api/comment/get/${id}`);
    return data;
  }
);

export const fetchDeleteComment = createAsyncThunk(
  "posts/fetchDeleteComment",
  async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/comment/delete/${id}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

const CommentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAddComment.pending, (state) => {
      state.oneComment.items = null;
      state.oneComment.status = "loading";
    });

    builder.addCase(fetchAddComment.fulfilled, (state, action) => {
      state.allComment.items.unshift(action.payload);
      state.oneComment.status = "loaded";
    });

    builder.addCase(fetchAddComment.rejected, (state) => {
      state.oneComment.items = null;
      state.oneComment.status = "loading";
    });

    builder.addCase(fetchGetComments.pending, (state) => {
      state.allComment.items = [];
      state.allComment.status = "loading";
    });

    builder.addCase(fetchGetComments.fulfilled, (state, action) => {
      state.allComment.items = action.payload;
      state.allComment.status = "loaded";
    });

    builder.addCase(fetchGetComments.rejected, (state) => {
      state.allComment.items = [];
      state.allComment.status = "loading";
    });

    builder.addCase(
      fetchDeleteComment.fulfilled,
      (state, action: PayloadAction<TComment>) => {
        state.allComment.items = state.allComment.items.filter(
          (obj) => obj.id !== action.meta.arg
        );
      }
    );
  },
});

export const commentReducer = CommentSlice.reducer;
