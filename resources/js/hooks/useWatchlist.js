import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredWatchlist,
  selectWatchlistById,
  addToWatchlist,
  removeFromWatchlist,
  setRating,
  setStatus,
} from '../store/watchlist.slice';
import { StatusFilters } from '../store/filters.slice';
import { showAlert } from '../utilities/showAlert';

export const useWatchlist = (serialId) => {
  const dispatch = useDispatch();
  const watchlist = useSelector(selectFilteredWatchlist);
  const watchlistItem = useSelector((state) =>
    selectWatchlistById(state, serialId)
  );

  return {
    watchlist,
    watchlistItem,
    setRating: (payload) => dispatch(setRating(payload)),
    setStatus: (payload) => {
      if (payload.status === StatusFilters.Completed)
        showAlert('Просмотрено', 'success');
      if (payload.status === StatusFilters.Active)
        showAlert('Смотрю', 'success');
      return dispatch(setStatus(payload));
    },
    addToWatchlist: (payload) => {
      showAlert('Добавлено', 'success');
      return dispatch(addToWatchlist(payload));
    },
    removeFromWatchlist: (payload) => dispatch(removeFromWatchlist(payload)),
  };
};
