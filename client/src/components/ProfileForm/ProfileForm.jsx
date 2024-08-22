import { useState } from 'react';
import styles from './ProfileForm.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function ProfileForm({ title, type = 'signin', setUser }) {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

    const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axiosInstance.put(
            `${import.meta.env.VITE_API}/profile`,
            inputs
          );
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <>
        
        </>
      );
}