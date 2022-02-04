import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import SerialCard from '../components/SerialCard';
import { selectSerials, getSerials } from '../store/popular.slice';
import Loader from '../utilities/Loader';

export const Home = () => {
  const dispatch = useDispatch();

  const { popular, hasErrors, hasMore, page } = useSelector(selectSerials);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getSerials(page));
    // setPage((prevState) => prevState + 1);
  }, [dispatch]);

  const getMoreSerials = () => {
    // setPage((prevState) => prevState + 1);
    setTimeout(() => {
      if (hasMore) {
        dispatch(getSerials(page));
      }
    }, 1000);
  };

  if (!popular) {
    return <div>Нет сериалов</div>;
  }
  if (hasErrors) {
    return <div>Ошибка...</div>;
  }

  return (
    <>
      <h2 className='my-3'>Популярные сериалы</h2>
      <InfiniteScroll
        dataLength={popular.length}
        next={getMoreSerials}
        hasMore={hasMore}
        loader={<Loader key={-1} />}
      >
        <div className='content'>
          {popular?.map((serial) => (
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
