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
import Loader from '../../utilities/Loader';
import { StatusFilters } from '../../store/filters.slice';
import { useWatchlist, useWatchlistItem } from '../../hooks/useWatchlist';
import Recomendations from '../../components/Recomendations';
import Rater from '../../components/Rater';

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

  const { addToWatchlist, removeFromWatchlist, setRating, setStatus } =
    useWatchlist();
  const { watchlistItem } = useWatchlistItem(serialId);

  useEffect(() => {
    dispatch(getSerial(serialId));
  }, [dispatch, serialId]);

  const onAddToWatchlist = (status) => {
    if (!watchlistItem) {
      const storeSerial = { id, name, status, rating: null };
      addToWatchlist(storeSerial);
    } else {
      setStatus({ id: serial.id, status: status });
    }
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

          <Dropdown as={ButtonGroup} className='w-100 mt-4 mb-3'>
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
          <div className='text-center' style={{ minHeight: '83px' }}>
            <Rater
              id={serialId}
              watchlistItem={watchlistItem}
              setRating={setRating}
            />
          </div>
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
                  {next && (
                    <tr>
                      <th scope='row'>Следующая серия</th>
                      <td>{next.air_date}</td>
                    </tr>
                  )}
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
