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
import { StatusFilters } from '../../store/filters.slice';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Loader from '../../utilities/Loader';
import { labels } from '../../constants/labels';
import { useWatchlist } from '../../hooks/useWatchlist';

export const SingleSerial = () => {
  const dispatch = useDispatch();
  const { serialId } = useParams();
  const { serial, loading, hasErrors } = useSelector(selectSerial);
  const { id, poster, title, description, year, rate, genres } = serial;
  const {
    watchlistItem,
    addToWatchlist,
    removeFromWatchlist,
    setRating,
    setStatus,
  } = useWatchlist(serialId);

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
      const storeSerial = { id, title, status, rating: null };
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

  const seasonList = (serial.seasons || ['']).map((season) => (
    <div key={(season.season_number + 1).toString()}>
      <Row style={{ fontSize: 14 }}>
        <Col xs={1}>{season.season_number}</Col>
        <Col xs={7}>{season.season_name}</Col>
        <Col xs={3}>{season.air_date}</Col>
        <Col xs={1}>{season.episode_count}</Col>
      </Row>
    </div>
  ));

  if (loading) return <Loader />;
  if (hasErrors) return <div>Ошибка при загрузке.</div>;

  return (
    <>
      <Row className='py-3 details'>
        <Col lg={3} className='px-0 me-4'>
          <img
            src={serial.poster}
            className='card-img-top shadow'
            alt={serial.title}
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
              <h1 className='serial-title'>{serial.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={10} className='mt-3'>
              <p className='text-left mb-5 lh-sm'>{serial.description}</p>
              <table>
                <tbody>
                  <tr>
                    <th scope='row'>Релиз</th>
                    <td>{serial.year}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Рейтинг IMDb</th>
                    <td>{serial.rate}/10</td>
                  </tr>
                </tbody>
              </table>
              <div className='h5 mb-4'>
                Жанры:&nbsp;
                {genres &&
                  genres.map((genre) => (
                    <span key={genre.toString()}>
                      <Badge className='mx-1' bg='secondary'>
                        {genre}
                      </Badge>{' '}
                    </span>
                  ))}
              </div>
              <div className='h5 mb-4 d-none d-sm-block'>Сезоны</div>
              <Row className='d-none d-sm-block'>
                <Col xs={10}>
                  <Row>
                    <Col xs={1}>
                      <b>#</b>
                    </Col>
                    <Col xs={7}>
                      <b>Название</b>
                    </Col>
                    <Col xs={3}>
                      <b>Дата выхода</b>
                    </Col>
                    <Col xs={1}>
                      <b>Эпизодов</b>
                    </Col>
                  </Row>
                  {seasonList}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
