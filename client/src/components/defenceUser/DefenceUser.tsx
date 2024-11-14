import { useEffect, useState } from 'react';
import axios from 'axios';
import {UserModel} from '../../types/userModel';
import styles from './defenceUser.module.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const DefenceUser = () => {
  const [userData, setUserData] = useState<UserModel>();
  const username = localStorage.getItem('username'); 
  const token = localStorage.getItem('token'); 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/users/${username}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('שגיאה בקבלת פרטי המשתמש:', error);
      }
    };

    if (username && token) {
      fetchUserData();
    }
  }, [username, token]);

  if (!userData) {
    return <div>טוען פרטי משתמש...</div>;
  }

  return (
    <div>
        <header className={styles.header}>
    <h1 className={styles.h1}>{userData.organization.name} :שם הארגון</h1>
      <p className={styles.name}>{userData.username} :שם</p>
      <div className={styles.missile}>
      {userData.organization.resources.map((missile) => (
        <div>
            <p>{missile.name}</p>
            <p>{missile.amount}</p>
        </div>
      ))}
      </div>
      </header>
      <div className={styles.body}>
        <table className={styles.table}>
            <thead>
              <tr>
                <th>Rocket</th>
                <th>Time to hit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default DefenceUser;
