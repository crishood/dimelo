import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEntries, postEntry, deleteEntry, getFollow } from "../api";
import { fetchFeed } from "./usersSlice";
import { setLoading } from "./uiSlice";

const initialState = {
  entries: [],
  followers: [],
  following: [],
};

export const fetchEntries = createAsyncThunk(
  "data/fetchEntries",
  async (_, { dispatch }) => {
    const entriesRes = await getEntries();
    dispatch(setEntries(entriesRes));
    dispatch(setLoading(false));
  }
);

export const postNewEntry = createAsyncThunk(
  "data/postNewEntry",
  async ({ description, picture, audio }, { dispatch }) => {
    dispatch(setLoading(true));

    const newEntry = await postEntry({ description, picture, audio });
    dispatch(fetchEntries());
    dispatch(setLoading(false));
  }
);

export const deleteAnEntry = createAsyncThunk(
  "data/deleteAnEntry",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    const entry = await deleteEntry(id);
    dispatch(destroyEntry(entry));
    dispatch(fetchFeed());
    dispatch(setLoading(false));
  }
);

export const fetchFollow = createAsyncThunk(
  "data/fetchFollow",
  async (_, { dispatch }) => {
    const follows = await getFollow();
    dispatch(setFollowers(follows.followers));
    dispatch(setFollowing(follows.following));
    dispatch(setLoading(false));
  }
);

export const userEntriesSlice = createSlice({
  name: "userEntries",
  initialState,
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
    destroyEntry: (state, action) => {
      const { _id } = action.payload;
      state.entries = state.entries.filter((item) => item._id !== _id);
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
  },
});

export const { setEntries, destroyEntry, setFollowers, setFollowing } =
  userEntriesSlice.actions;

export default userEntriesSlice.reducer;
