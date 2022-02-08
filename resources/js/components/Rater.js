import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { labels } from '../constants/labels';
// import { useWatchlist, useWatchlistItem } from '../hooks/useWatchlist';

export default function Rater({ id, watchlistItem, setRating }) {
  // const { setRating } = useWatchlist();
  // const { watchlistItem } = useWatchlistItem(id);

  const { rating: userRating } = watchlistItem ? watchlistItem : { rating: 0 };

  const [hover, setHover] = useState(-1);

  const onRatingChange = (e, newValue) => {
    setRating({ id, rating: newValue });
  };
  const onChangeActive = (e, newHover) => {
    setHover(newHover);
  };

  return (
    <>
      {watchlistItem && (
        <>
          <h6 className='mb-2'>Оценка: </h6>
          <Rating
            value={userRating}
            max={10}
            onChange={onRatingChange}
            onChangeActive={onChangeActive}
          />
          <Box>{labels[hover !== -1 ? hover : userRating]}</Box>
        </>
      )}
    </>
  );
}
