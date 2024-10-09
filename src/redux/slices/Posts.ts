import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios.ts";
import { TPost, TText } from "../../types/TypesPost.ts";

interface IItem {
  onePost: {
    status: string;
    items: TPost | null;
  };
  allPosts: {
    status: string;
    items: TPost[];
  };
}

const initialState: IItem = {
  onePost: {
    status: "loading",
    items: null,
  },
  allPosts: {
    status: "loading",
    items: [],
  },
};

export const fetchPosts = createAsyncThunk<TPost[]>(
  "posts/fetchPosts",
  async () => {
    try {
      const { data } = await axios.get("/api/post/getposts");
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const fetchAddPost = createAsyncThunk<TPost, TText>(
  "posts/fetchAddPost",
  async (text) => {
    try {
      const { data } = await axios.post("/api/post/addpost", text);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/post/deletepost/${id}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.allPosts.items = [];
      state.allPosts.status = "loading";
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.allPosts.items = action.payload;
      state.allPosts.status = "loaded";
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.allPosts.items = [];
      state.allPosts.status = "loading";
    });

    builder.addCase(fetchAddPost.pending, (state) => {
      state.onePost.items = null;
      state.onePost.status = "loading";
    });

    builder.addCase(fetchAddPost.fulfilled, (state, action) => {
      state.allPosts.items.unshift(action.payload);

      state.onePost.status = "loaded";
    });

    builder.addCase(fetchAddPost.rejected, (state) => {
      state.onePost.items = null;
      state.onePost.status = "loading";
    });

    builder.addCase(
      fetchDeletePost.fulfilled,
      (state, action: PayloadAction<TPost>) => {
        state.allPosts.items = state.allPosts.items.filter(
          (obj) => obj.id !== action.meta.arg
        );
      }
    );
  },
});

export const postsReducer = PostsSlice.reducer;
