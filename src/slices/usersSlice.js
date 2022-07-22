import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchUsers, getFeed, getUsers } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
  users: [],
  entries: [],
};

export const fetchUsers = createAsyncThunk(
  "data/fetchUsers",
  async ({ role, location }, { dispatch }) => {
    const usersRes = await searchUsers({ role, location });
    dispatch(setUsers(usersRes));
    dispatch(setLoading(false));
  }
);

export const fetchFeed = createAsyncThunk(
  "data/fetchFeed",
  async (_, { dispatch }) => {
    const entries = await getFeed();

    dispatch(setFeed(entries));
    dispatch(setLoading(false));
  }
);

export const fetchAllUsers = createAsyncThunk(
  "data/fetchAllUsers",
  async (_, { dispatch }) => {
    const users = await getUsers();

    dispatch(setUsers(users));
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFeed: (state, action) => {
      state.entries = action.payload;
    },
  },
});

export const { setUsers, setFeed } = usersSlice.actions;

export default usersSlice.reducer;
