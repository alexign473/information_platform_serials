import { createSlice } from '@reduxjs/toolkit';
import serialsAxios, { API_KEY } from '../api/serialsAxios';

const initialState = {
  query: '',
  searchedSerials: [],
  page: 1,
  scroll_page: 2,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, { payload }) {
      state.query = payload;
    },
    setSearchedSerials(state, { payload }) {
      state.searchedSerials = payload;
      //   state.query = payload;
    },
    clearQuery(state) {
      state.searchedSerials = [];
      state.query = '';
    },
  },
});

export const selectSearch = (state) => state.search;

export const { setQuery, clearQuery, setSearchedSerials } = searchSlice.actions;
export default searchSlice.reducer;

export const getSearchedSerials = (query) => async (dispatch) => {
  try {
    if (query) {
      const { data } = await serialsAxios.get(
        `search/tv?api_key=f3c4b5f33f6fbf575f8604679a656e42&language=ru-RU&page=1&query=${query}&include_adult=false`
      );
      console.log(data.results);
      dispatch(setSearchedSerials(data.results));
    }
  } catch (err) {
    console.log(err);
  }
};
