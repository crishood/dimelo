import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchUsers } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
  users: [],
};

export const fetchUsers = createAsyncThunk(
  "data/fetchUsers",
  async ({ role, location }, { dispatch }) => {
    dispatch(setLoading(true));
    const usersRes = await searchUsers({ role, location });
    dispatch(setUsers(usersRes));
    dispatch(setLoading(false));
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
