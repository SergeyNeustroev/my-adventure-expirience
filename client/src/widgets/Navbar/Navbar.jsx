import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";


export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    changeHandler
  }, []);

  const logoutHandler = async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/auth/logout`
    );
    if (response.status === 200) {
      setUser({});
      setAccessToken('');
      navigate('/');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Link to='/'>На главную</Link>
      </div>
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Link to='/profile'>{user.username}</Link>
            <Link onClick={logoutHandler}>Выйти</Link>
          </>
        ) : (
          <>
            <Link to='/signin'>Войти</Link>
            <Link to='/signup'>Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
