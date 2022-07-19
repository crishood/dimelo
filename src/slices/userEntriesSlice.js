import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEntries, postEntry } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
  entries: [],
};

// export const fetchPokemonsWithDetails = createAsyncThunk(
//   'data/fetchPokemonsWithDetails',
//   async (_, { dispatch }) => {
//     dispatch(setLoading(true));
//     const pokemonsRes = await getPokemon();
//     const pokemonsDetailed = await Promise.all(
//       pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
//     );
//     dispatch(setPokemons(pokemonsDetailed));
//     dispatch(setLoading(false));
//   }
// );

export const fetchEntries = createAsyncThunk(
  "data/fetchEntries",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const entriesRes = await getEntries();
    dispatch(setEntries(entriesRes));
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
  },
});

export const { setEntries } = userEntriesSlice.actions;

export default userEntriesSlice.reducer;
