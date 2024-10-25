import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios.js";
import { TAddComment, TComment } from "../../types/TypesComment.js";
import { TFollows } from "../../types/TypesFolower.js";
interface initialState {
  allFollowers: {
    status: string;
    items: TFollows[];
  };
  allFollowing: {
    status: string;
    items: TFollows[];
  };
}

const initialState: initialState = {
  allFollowers: {
    status: "loading",
    items: [],
  },
  allFollowing: {
    status: "loading",
    items: [],
  },
};

export const fetchAddFollow = createAsyncThunk<TFollows, string>(
  "comment/fetchAddFollow",
  async (id) => {
    const { data } = await axios.post(`/api/follow/subscribe/${id}`);
    return data;
  }
);
export const fetchGetFollowing = createAsyncThunk<TFollows[], string>(
  "comment/fetchGetFollowing",
  async (id) => {
    const { data } = await axios.get(`/api/follow/getfollowing/${id}`);
    return data;
  }
);

export const fetchGetFollowers = createAsyncThunk<TFollows[], string>(
  "comment/fetchGetFollowers",
  async (id) => {
    const { data } = await axios.get(`/api/follow/getfollowers/${id}`);
    return data;
  }
);

export const fetchDeleteFollow = createAsyncThunk(
  "posts/fetchDeleteFollow",
  async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/follow/unsubscribe/${id}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

const FollowSlice = createSlice({
  name: "followtSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAddFollow.pending, (state) => {
      state.allFollowers.status = "loading";
    });

    builder.addCase(fetchAddFollow.fulfilled, (state, action) => {
      state.allFollowers.items.push(action.payload);
      state.allFollowers.status = "loaded";
    });

    builder.addCase(fetchAddFollow.rejected, (state) => {
      state.allFollowers.items = [];
      state.allFollowers.status = "loading";
    });

    builder.addCase(fetchGetFollowing.pending, (state) => {
      state.allFollowing.items = [];
      state.allFollowing.status = "loading";
    });

    builder.addCase(fetchGetFollowing.fulfilled, (state, action) => {
      state.allFollowing.items = action.payload;
      state.allFollowing.status = "loaded";
    });

    builder.addCase(fetchGetFollowing.rejected, (state) => {
      state.allFollowing.items = [];
      state.allFollowing.status = "loading";
    });

    builder.addCase(fetchGetFollowers.pending, (state) => {
      state.allFollowers.items = [];
      state.allFollowers.status = "loading";
    });

    builder.addCase(fetchGetFollowers.fulfilled, (state, action) => {
      state.allFollowers.items = action.payload;
      state.allFollowers.status = "loaded";
    });

    builder.addCase(fetchGetFollowers.rejected, (state) => {
      state.allFollowers.items = [];
      state.allFollowers.status = "loading";
    });

    builder.addCase(
      fetchDeleteFollow.fulfilled,
      (state, action: PayloadAction<TComment>) => {
        state.allFollowers.items = state.allFollowers.items.filter(
          (obj) => obj.id !== action.meta.arg
        );
      }
    );
  },
});

export const followReducer = FollowSlice.reducer;
