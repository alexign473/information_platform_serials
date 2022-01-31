import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  FormControl,
  Button,
} from 'react-bootstrap';
import * as ROUTES from '../constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../store/auth.slice';

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
      className='py-3 mb-4 shadow-lg'
    >
      <Container fluid='sm'>
        <Navbar.Brand as={NavLink} to='/'>
          serial searcher
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='mr-auto'>
            <NavDropdown className='me-2' title='Меню' variant='dark'>
              <NavDropdown.Item as={NavLink} to={ROUTES.SERIALS}>
                Каталог сериалов
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
            </NavDropdown>
          </Nav>
          <FormControl
            className='me-2'
            type='search'
            placeholder='Поиск'
            aria-label='Search'
          />
          {isLoggedIn ? <LoggedInView logOut={logOut} /> : <LoggedOutView />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const LoggedInView = ({ logOut }) => (
  <Nav>
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
  <Nav>
    <Nav.Link as={NavLink} to={ROUTES.SIGN_IN}>
      Вход
    </Nav.Link>
    <Button as={NavLink} to={ROUTES.SIGN_UP}>
      Регистрация
    </Button>
  </Nav>
);
