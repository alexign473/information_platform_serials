import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import SerialCard from '../components/SerialCard';
import { selectSerials, getSerials } from '../store/serials.slice';
import Loader from '../utilities/Loader';

export const Home = () => {
  const dispatch = useDispatch();

  const { serials, hasErrors, hasMore, page } = useSelector(selectSerials);

  useEffect(() => {
    dispatch(getSerials(page));
  }, [dispatch]);

  const getMoreSerials = () => {
    setTimeout(() => {
      if (hasMore) {
        dispatch(getSerials(page));
      }
    }, 1000);
  };

  if (!serials) {
    return <div>Нет сериалов</div>;
  }
  if (hasErrors) {
    return <div>Ошибка...</div>;
  }

  return (
    <>
      <h2 className='my-3 ms-5'>Популярные сериалы</h2>
      <InfiniteScroll
        dataLength={serials.length}
        next={getMoreSerials}
        hasMore={hasMore}
        loader={<Loader key={-1} />}
      >
        <div className='content'>
          {serials?.map((serial) => (
            <SerialCard
              key={serial.id}
              poster={serial.poster_path}
              title={serial.name}
              id={serial.id}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};
