import { createSlice, createSelector } from '@reduxjs/toolkit';
import { StatusFilters } from './filters.slice';

const initialState = {
  entities: {},
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, { payload }) => {
      state.entities[payload.id] = payload;
    },
    removeFromWatchlist: (state, { payload }) => {
      delete state.entities[payload];
    },
    setRating: (state, { payload }) => {
      const { id, rating } = payload;
      state.entities[id].rating = rating;
    },
    setStatus: (state, { payload }) => {
      const { id, status } = payload;
      state.entities[id].status = status;
    },
  },
});

// Actions
export const { addToWatchlist, removeFromWatchlist, setRating, setStatus } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;

// Selectors
export const selectWatchlistEntities = (state) => state.watchlist.entities;

export const selectWatchlist = createSelector(
  selectWatchlistEntities,
  (entities) => Object.values(entities)
);

export const selectWatchlistById = (state, id) => {
  return selectWatchlistEntities(state)[id];
};

export const selectWatchlistSorted = createSelector(selectWatchlist, (values) =>
  values.sort((a, b) => b.rating - a.rating)
);

export const selectFilteredWatchlist = createSelector(
  selectWatchlistSorted,
  (state) => state.filters,
  (values, filters) => {
    const { status, searchQuery } = filters;
    const showAll = status === StatusFilters.All;
    if (showAll && searchQuery.length === 0) {
      return values;
    }

    return values.filter((item) => {
      const statusMatches = showAll || item.status === status;
      const searchQueryMatches =
        searchQuery.length === 0 ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return statusMatches && searchQueryMatches;
    });
  }
);
