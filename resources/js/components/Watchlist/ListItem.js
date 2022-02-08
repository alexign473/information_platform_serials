import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import * as ROUTES from '../../constants/routes';
import { useWatchlist, useWatchlistItem } from '../../hooks/useWatchlist';
import { StatusFilters } from '../../store/filters.slice';
import Rater from '../Rater';
import { Collapse } from 'react-bootstrap';

export default function ListItem({ i, id }) {
  const { removeFromWatchlist, setStatus, setRating } = useWatchlist();
  const { watchlistItem } = useWatchlistItem(id);
  const { name, rating, status } = watchlistItem;

  const disabled = status === StatusFilters.Completed;

  // const wrapperRef = useRef(null);
  // console.log('ref', wrapperRef);
  const [open, setOpen] = useState(false);

  // const toggle = useCallback(() => setOpen(!open));
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <tr>
      <th scope='row'>{i + 1}</th>
      <td style={{ width: '100%' }}>
        <div className='d-flex justify-content-between'>
          <div className='flex-grow-1' onClick={toggle}>
            <Link
              to={`${ROUTES.SERIALS}/${id}`}
              className='text-decoration-none text-body'
            >
              {name}
            </Link>
          </div>

          <div>
            <Button
              onClick={() =>
                setStatus({ id: id, status: StatusFilters.Completed })
              }
              disabled={disabled}
            >
              Просмотрено
            </Button>{' '}
            <Button onClick={() => removeFromWatchlist(id)}>-</Button>
          </div>
        </div>
        <Collapse in={open}>
          <div>
            {open && (
              <Rater
                id={id}
                watchlistItem={watchlistItem}
                setRating={setRating}
              />
            )}
          </div>
        </Collapse>
      </td>
      {rating ? <td>{rating}/10</td> : null}
    </tr>
  );
}
