import { createSlice } from '@reduxjs/toolkit';
import serialsAxios, { API_KEY } from '../api/serialsAxios';

const initialState = {
  serial: {},
  recomendations: [],
  loading: false,
  hasErrors: false,
};

const serialSlice = createSlice({
  name: 'serial',
  initialState,
  reducers: {
    setSerial: (state, { payload }) => {
      state.serial = payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingComplete: (state) => {
      state.loading = false;
    },
    setSerialFailure: (state) => {
      state.hasErrors = true;
    },
    setRecomendations: (state, { payload }) => {
      state.recomendations = payload;
    },
  },
});

// Selectors
export const selectSerial = (state) => state.serial;

// Actions
export const {
  setSerial,
  setLoading,
  setLoadingComplete,
  setSerialFailure,
  setRecomendations,
} = serialSlice.actions;
export default serialSlice.reducer;

// Thunks
export const getSerial = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const details = await getDetails(id);
    dispatch(setSerial(details));
    const recomendations = await getRecomended(id);
    dispatch(setRecomendations(recomendations.results));
  } catch (err) {
    dispatch(setSerialFailure());
  } finally {
    dispatch(setLoadingComplete());
  }
};

async function getDetails(id) {
  const { data } = await serialsAxios.get(
    `tv/${id}?api_key=${API_KEY}&language=ru`
  );
  return data;
}

async function getRecomended(id) {
  const { data } = await serialsAxios.get(
    `tv/${id}/recommendations?api_key=${API_KEY}&language=ru`
  );
  return data;
}

// export const getSerial = (id) => async (dispatch) => {
//   dispatch(setLoading());
//   try {
//     const { data } = await serialsAxios.get(
//       `tv/${id}?api_key=${API_KEY}&language=ru`
//     );
//     dispatch(setSerial(data));
//   } catch (err) {
//     dispatch(setSerialFailure());
//   } finally {
//     dispatch(setLoadingComplete());
//   }
// };
