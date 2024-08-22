import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

export default function HomePage({ user }) {
  const [entries, setEntries] = useState([]);

  // useEffect(() => {
  //   axiosInstance
  //     .get(`${import.meta.env.VITE_API}/tasks`)
  //     .then((res) => {
  //       setEntries(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <div>
    </div>
  );
}
