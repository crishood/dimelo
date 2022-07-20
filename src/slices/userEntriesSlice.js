import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEntries, postEntry, deleteEntry } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
  entries: [],
};

export const fetchEntries = createAsyncThunk(
  "data/fetchEntries",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
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
  },
});

export const { setEntries, destroyEntry } = userEntriesSlice.actions;

export default userEntriesSlice.reducer;
