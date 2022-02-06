import { createSlice } from '@reduxjs/toolkit';
import serialsAxios, { API_KEY } from '../api/serialsAxios';

const initialState = {
  serials: [],
  page: 1,
  hasMore: true,
  loading: false,
  hasErrors: false,
};

const serialsSlice = createSlice({
  name: 'serials',
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
      state.serials.push(...payload);
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
export const selectSerials = (state) => state.serials;

// Actions
export const { setSerials, setLoading, setLoadingComplete, setSerialsFailure } =
  serialsSlice.actions;
export default serialsSlice.reducer;

// Thunks
export const getSerials = (page) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await serialsAxios.get(
      // `discover/tv?api_key=${API_KEY}&language=ru-RU&sort_by=popularity.desc&page=${page}`
      `tv/top_rated?api_key=${API_KEY}&language=ru-RU&page=${page}`
    );
    dispatch(setSerials(data.results));
  } catch (err) {
    console.log(err);
    dispatch(setSerialsFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
};
