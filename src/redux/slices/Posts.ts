import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.ts";

const initialState = {
  onePost: {
    status: "loading",
    items: [],
  },
  allPosts: {
    status: "loading",
    items: [],
  },
};

interface IPost {
  text: string;
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/api/post/getposts");
  return data;
});

export const fetchAddPost = createAsyncThunk(
  "posts/fetchAddPost",
  async (arrText: IPost) => {
    const { data } = await axios.post("/api/post/addpost", arrText);
    return data;
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
      state.onePost.items = [];
      state.onePost.status = "loading";
    });

    builder.addCase(fetchAddPost.fulfilled, (state, action) => {
      state.allPosts.items.unshift(action.payload);
      state.onePost.status = "loaded";
    });

    builder.addCase(fetchAddPost.rejected, (state) => {
      state.onePost.items = [];
      state.onePost.status = "loading";
    });
  },
});

export const postsReducer = PostsSlice.reducer;
