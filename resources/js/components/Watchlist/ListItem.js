import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import * as ROUTES from '../../constants/routes';
import { useWatchlist } from '../../hooks/useWatchlist';
import { StatusFilters } from '../../store/filters.slice';

export default function ListItem({ i, id }) {
  const { watchlistItem, removeFromWatchlist, setStatus } = useWatchlist(id);
  const { name, rating, status } = watchlistItem;

  const disabled = status === StatusFilters.Completed;

  return (
    <tr>
      <th scope='row'>{i + 1}</th>
      <td style={{ width: '100%' }}>
        <div className='d-flex justify-content-between'>
          <Link
            to={`${ROUTES.SERIALS}/${id}`}
            className='text-decoration-none text-body'
          >
            {name}
          </Link>{' '}
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
      </td>
      {rating ? <td>{rating}/10</td> : null}
    </tr>
  );
}
