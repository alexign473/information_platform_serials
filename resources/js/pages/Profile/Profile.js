import { Link, Outlet } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export const Profile = () => {
  return (
    <div>
      <h2 className='my-3'>Профиль</h2>
      <Link to={ROUTES.WATCHLIST}>Список просмотра</Link>{' '}
      {/* <Link to={ROUTES.FAVOURITES}>Избранное</Link>{' '} */}
      <Link to={ROUTES.SETTINGS}>Настройки</Link>
      <Outlet />
    </div>
  );
};
