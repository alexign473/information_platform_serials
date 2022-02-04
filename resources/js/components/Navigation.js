import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import * as ROUTES from '../constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../store/auth.slice';
import SearchBar from './SearchBar/SearchBar';

export default function Navigation() {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(selectAuth);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      className='p-0 mb-4 shadow-lg '
    >
      <Container className='flex-column align-items-start flex-md-row align-items-md-center'>
        <Navbar.Brand as={NavLink} to='/' className='order-1 '>
          serial searcher
        </Navbar.Brand>
        <Nav className='order-2'>
          <Nav.Link as={Link} to={`${ROUTES.SERIALS}`}>
            ТОП сериалов
          </Nav.Link>
          {/* <NavDropdown className='me-2' title='Меню' variant='dark'>
            <NavDropdown.Item as={Link} to={`${ROUTES.SERIALS}`}>
              ТОП сериалов
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to={`${ROUTES.PROFILE}/${ROUTES.WATCHLIST}`}
            >
              Список просмотра
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to={`${ROUTES.PROFILE}/${ROUTES.FAVOURITES}`}
            >
              Избранное
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <div
          className='w-100 position-relative order-4 order-md-3'
          style={{ minHeight: '3em' }}
        >
          <SearchBar />
        </div>
        <Nav className='order-3 order-md-4'>
          <Nav.Link as={NavLink} to={`${ROUTES.PROFILE}/${ROUTES.WATCHLIST}`}>
            Список просмотра
          </Nav.Link>
        </Nav>

        {/* {isLoggedIn ? <LoggedInView logOut={logOut} /> : <LoggedOutView />} */}
      </Container>
    </Navbar>
  );
}

const LoggedInView = ({ logOut }) => (
  <Nav className='order-3 order-md-4'>
    <NavDropdown className='me-2' title='Профиль'>
      <NavDropdown.Item as={NavLink} to={ROUTES.PROFILE}>
        Профиль
      </NavDropdown.Item>
      <NavDropdown.Item as={Button} onClick={logOut}>
        Выход
      </NavDropdown.Item>
    </NavDropdown>
  </Nav>
);

const LoggedOutView = () => (
  <Nav className='order-3 order-md-4'>
    <Nav.Link as={NavLink} to={ROUTES.SIGN_IN}>
      Вход
    </Nav.Link>
    <Button as={NavLink} to={ROUTES.SIGN_UP}>
      Регистрация
    </Button>
  </Nav>
);
