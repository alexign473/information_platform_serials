import { createSlice } from '@reduxjs/toolkit';
import serialsAxios, { API_KEY } from '../api/serialsAxios';

const initialState = {
  popular: [],
  page: 1,
  hasMore: true,
  loading: false,
  hasErrors: false,
};

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    setSerials: (state, { payload }) => {
      let setHasMore;
      if (payload !== undefined) {
        setHasMore = payload.length !== 0 ? true : false;
      } else {
        setHasMore = false;
      }
      state.hasMore = setHasMore;
      state.popular.push(...payload);
      state.page++;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
    setSerialsFailure: (state) => {
      state.hasErrors = true;
    },
  },
});

// Selectors
export const selectSerials = (state) => state.popular;

// Actions
export const { setSerials, setLoading, setLoadingComplete, setSerialsFailure } =
  popularSlice.actions;
export default popularSlice.reducer;

// Thunks
export const getSerials = (page) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await serialsAxios.get(
      `tv/popular?api_key=${API_KEY}&language=ru-RU&page=${page}`
    );
    dispatch(setSerials(data.results));
  } catch (err) {
    console.log(err);
    dispatch(setSerialsFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
};
