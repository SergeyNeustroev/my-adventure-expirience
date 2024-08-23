import { useState, useEffect } from 'react';
import styles from './Profilepage.module.css';
import axiosInstance, { setAccessToken } from "../../axiosInstance";
import { Input, Button, Avatar, Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material/';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material/';

export default function ProfilePage({ user, setUser }) {
  const [inputs, setInputs] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let reqData = { username: inputs.username, email: inputs.email, password: inputs.password || null }
        
    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API}/profile/changeLogin`,
        reqData
      );
      
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axiosInstance
    .get(`${import.meta.env.VITE_API}/profile`)
    .then((res) => {
      setInputs({ username: res.data.username, email: res.data.email, photo: res.data.photo });
    })
    .catch((err) => console.error(err));
  }, [setUser]);
  
  
  return (
    <div className={styles.wrapper1}>
      <div className={styles.wrapper}>
        <Box className={styles.photodiv} component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}} noValidate autoComplete="off">
          <Avatar alt={user.username} src={`http://localhost:3100/photos/${user.photo}`} sx={{ width: 300, height: 300 }} />
          <form action="http://localhost:3100/api/profile/changePhoto" method="post" encType="multipart/form-data">
          <Input type="file" name="photo"></Input>
          <Button type="submit" variant="contained">Изменить</Button>
          </form>
        </Box>
        <Box className={styles.information} component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
          <div>
            
          </div>
          <div className={styles.inputs}>
            <TextField focused onChange={changeHandler} id="Outlined secondary" label="Изменить имя" name="username" value={inputs.username}/>
            <TextField focused onChange={changeHandler} id="outlined-required" type='email' label="Изменить эл.почту" name="email" value={inputs.email}/>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" onChange={changeHandler} name="password">Изменить пароль</InputLabel>
              <OutlinedInput id="outlined-adornment-password" onChange={changeHandler} name="password" type={showPassword ? 'text' : 'password'} 
                endAdornment={
                  <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                }
                label="Password"/>
            </FormControl>
          </div>
          <div className={styles.button}>
            <Button onClick={submitHandler} variant="contained">Изменить</Button>
          </div>
        </Box>
    </div>
    <div className={styles.wrapper}>

    </div>
  </div>
  );
}