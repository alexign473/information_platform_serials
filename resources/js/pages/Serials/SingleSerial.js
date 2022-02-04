import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSerial, selectSerial } from '../../store/serial.slice';
import {
  Row,
  Col,
  Button,
  Badge,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Loader from '../../utilities/Loader';
import { labels } from '../../constants/labels';
import { StatusFilters } from '../../store/filters.slice';
import { useWatchlist } from '../../hooks/useWatchlist';
import { selectWatchlistById } from '../../store/watchlist.slice';
import Recomendations from '../../components/Recomendations';

export const SingleSerial = () => {
  const dispatch = useDispatch();
  const { serialId } = useParams();
  const { serial, loading, hasErrors } = useSelector(selectSerial);
  const {
    id,
    name,
    first_air_date: release,
    genres,
    overview,
    poster_path: poster,
    vote_average: rate,
    number_of_episodes: episodes,
    next_episode_to_air: next,
    status,
  } = serial;

  const {
    // watchlistItem,
    addToWatchlist,
    removeFromWatchlist,
    setRating,
    setStatus,
  } = useWatchlist();
  const watchlistItem = useSelector((state) =>
    selectWatchlistById(state, serialId)
  );

  useEffect(() => {
    dispatch(getSerial(serialId));
  }, [dispatch, serialId]);

  const [hover, setHover] = useState(-1);

  const onRatingChange = (e, newValue) => {
    setRating({ id: serial.id, rating: newValue });
  };
  const onChangeActive = (e, newHover) => {
    setHover(newHover);
  };

  const onAddToWatchlist = (status) => {
    if (!watchlistItem) {
      const storeSerial = { id, name, status, rating: null };
      addToWatchlist(storeSerial);
    } else {
      setStatus({ id: serial.id, status: status });
    }
  };

  const renderRating = () => {
    const { rating: userRating } = watchlistItem
      ? watchlistItem
      : { rating: 0 };

    return (
      watchlistItem && (
        <>
          <div className='text-center'>
            <h6 className='mt-3 mb-2'>Оценка: </h6>
            <Rating
              value={userRating}
              max={10}
              onChange={onRatingChange}
              onChangeActive={onChangeActive}
            />
            <Box>{labels[hover !== -1 ? hover : userRating]}</Box>
          </div>
        </>
      )
    );
  };

  if (loading) return <Loader />;
  if (hasErrors) return <div>Ошибка при загрузке.</div>;

  return (
    <>
      <Row className='py-3 details'>
        <Col md={5} lg={3} className='px-0 me-4'>
          <img
            src={
              poster
                ? `https://image.tmdb.org/t/p/original${poster}`
                : 'http://via.placeholder.com/210x315?text=No poster'
            }
            className='shadow'
            style={{ width: '100%' }}
            alt={name}
          />

          <Dropdown as={ButtonGroup} className='w-100 mt-4'>
            <Button
              className='w-100'
              disabled={!!watchlistItem}
              onClick={() => onAddToWatchlist(StatusFilters.Active)}
            >
              Добавить в список
            </Button>
            <Dropdown.Toggle split />
            <Dropdown.Menu align='end'>
              <Dropdown.Item
                onClick={() => onAddToWatchlist(StatusFilters.Active)}
              >
                Смотрю
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onAddToWatchlist(StatusFilters.Completed)}
              >
                Просмотрено
              </Dropdown.Item>
              <Dropdown.Item onClick={() => removeFromWatchlist(serial.id)}>
                Удалить из списка
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {renderRating()}
        </Col>

        <Col>
          <Row p={1}>
            <Col>
              <h1 className='details-title'>{name}</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={10} className='mt-3'>
              <p className='text-left mb-5 lh-sm'>{overview}</p>
              <div className='h5 mb-4'>
                Жанры:&nbsp;
                {genres &&
                  genres.map((genre) => (
                    <span key={genre.id}>
                      <Badge className='mx-1' bg='secondary'>
                        {genre.name}
                      </Badge>{' '}
                    </span>
                  ))}
              </div>
              <table>
                <tbody>
                  <tr>
                    <th scope='row'>Релиз</th>
                    <td>{release}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Средняя оценка</th>
                    <td>{rate}/10</td>
                  </tr>
                  <tr>
                    <th scope='row'>Статус</th>
                    <td>{status}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Эпизодов</th>
                    <td>{episodes}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Следующая серия</th>
                    <td>{next ? next.air_date : '-'}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Col>
      </Row>
      <Recomendations />
    </>
  );
};
