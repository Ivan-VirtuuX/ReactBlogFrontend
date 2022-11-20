import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.header}>
          <div className={styles.inner}>
            <Link className={styles.logo} to="/">
              <div>React Blog</div>
            </Link>
            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <Link to="/add-post">
                    <Button variant="contained" style={{ marginRight: '10px' }}>
                      Написать статью
                    </Button>
                  </Link>
                  <Button onClick={onClickLogout} variant="contained" color="error">
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outlined" style={{ marginRight: 10 }}>
                      Войти
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained">Создать аккаунт</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
