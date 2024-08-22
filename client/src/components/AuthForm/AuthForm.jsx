import { useState } from 'react';
import styles from './AuthForm.module.css';
import Button from '@mui/material/Button';
import ExploreIcon from '@mui/icons-material/Explore';
import TextField from '@mui/material/TextField';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';


export default function AuthForm({ title, type = 'signin', setUser }) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/auth/${type}`,
        inputs
      );
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>{title}</h3>
      <div className={styles.inputs}>
        {type === 'signin' && (
          <>
            <TextField variant="outlined" onChange={changeHandler} type='email' name='email' value={inputs?.email} placeholder='Эл.почта'
            />
            <TextField variant="outlined" onChange={changeHandler} type='password' name='password' value={inputs?.password} placeholder='Пароль'
            />
          </>
        )}
        {type === 'signup' && (
          <>
            <TextField variant="outlined" onChange={changeHandler} name='username' value={inputs?.username} placeholder='Имя пользователя'
            />
            <TextField variant="outlined" onChange={changeHandler} type='email' name='email' value={inputs?.email} placeholder='Эл.почта'
            />
            <TextField variant="outlined" onChange={changeHandler} type='password' name='password' value={inputs?.password} placeholder='Пароль'
            />
          </>
        )}
      </div>
      <div className={styles.btns}>
        {type === 'signin' && (
          <Button variant="contained" type='submit' endIcon={<ExploreIcon />}>Вход</Button>
        )}
        {type === 'signup' && (
          <Button variant="contained" type='submit'>Регистрация</Button>
        )}
      </div>
    </form>
  );
}
