import { useState, useEffect } from 'react';
import styles from './Profilepage.module.css';
import axiosInstance from "../../axiosInstance";
import { Avatar, Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material/';
import { Visibility, VisibilityOff } from '@mui/icons-material/';

export default function ProfilePage({ user }) {
  const [entries, setEntries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/profile`)
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.wrapper}>
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    border="1px solid black"
    >
      <Avatar
        alt="Rayan Gosling"
        src='../../../assets/profilePhotos/default.jpg'
        sx={{ width: 56, height: 56 }}
      />
    </Box>

    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    border="1px solid black"
    >
        <TextField
          id="outlined-required"
          label="Username"
          />
        <TextField
          id="outlined-required"
          type='email'
          label="Email"
          />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            />
        </FormControl>
    </Box>
  </div>
  );
}