import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../services/userApi';
import styles from './login.module.css';
import { AppDispatch } from '../../store/store';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        username: name,
        password,
      });

      console.log(response.data, response.data.token);

      if (response.data && response.data.token) {
        localStorage.setItem('username', name);
        localStorage.setItem('token', response.data.token);

        dispatch(fetchUser(name));

        navigate('/users');
      } else {
        alert('ההתחברות נכשלה. אנא בדוק את הנתונים שהזנת.');
      }
    } catch (error) {
      console.error('שגיאה בתהליך ההתחברות:', error);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>login</h1>
      <form onSubmit={handleSubmit}>
        <input className={styles.input}
          type="text"
          placeholder="שם משתמש"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input className={styles.input}
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">שלח</button>
        <Link to="/register">הרשמה</Link>
      </form>
    </div>
  );
};

export default Login;
