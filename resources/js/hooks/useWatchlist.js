import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilteredWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  setRating,
  setStatus,
  selectWatchlistById,
} from '../store/watchlist.slice';
import { StatusFilters } from '../store/filters.slice';
import { showAlert } from '../utilities/showAlert';

export const useWatchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector(selectFilteredWatchlist);

  return {
    watchlist,
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
    removeFromWatchlist: (payload) => {
      showAlert('Удалено', 'warning');
      return dispatch(removeFromWatchlist(payload));
    },
  };
};

export const useWatchlistItem = (id) => {
  const watchlistItem = useSelector((state) => selectWatchlistById(state, id));

  return {
    watchlistItem,
  };
};
