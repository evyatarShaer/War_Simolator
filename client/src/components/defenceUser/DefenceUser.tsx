import React, { useEffect } from "react";
import { fetchUser, sendMissile } from "../../services/userApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { MessageModel } from "../../types/messageModel";
import styles from "./defenceUser.module.css";
import Chat from '../chat/Chat';
import io from 'socket.io-client';
 
const BASE_URL = import.meta.env.VITE_BASE_URL;
const socket = io(BASE_URL); 

const DefenceUser: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    const username = localStorage.getItem('username');

    if (status === "idle" && username) {
      dispatch(fetchUser(username));
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleMissileClick = (missile: { name: string; amount: number; _id: string }) => {
    // צור אובייקט של הודעה מהמידע של הטיל
    const message: MessageModel = {
      rocket: missile.name,
      timeToHit: missile.amount,  // נחליף את זה בפונקציה בפרונט שעושה סטינטארוול ובודקת כמה זמן עוד נשאר
      status: "Launched",  // הסטטוס גם יגיע מהפונקציה
    };

    // שלח את ההודעה לשרת דרך socket
    socket.emit('chat message', message); // שליחת ההודעה לשרת
    // אפשר להוסיף גם שליחה דרך Redux, אם יש צורך להוסיף את זה למצב Redux
    if (!user) return null;
    dispatch(sendMissile({ userId: user._id, missileId: missile._id }));
  };

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.h1}>{user?.organization.name} :שם הארגון</h1>
        <p className={styles.name}>{user?.username} :שם</p>
        <div className={styles.missile}>
          {user?.organization.resources.map((missile) => (
            <div key={missile.name} onClick={() => {
              dispatch(sendMissile({ userId: user._id, missileId: missile._id }));
              handleMissileClick(missile);
            }}>
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
          <tbody><div><Chat/></div></tbody>
        </table>
      </div>
    </div>
  );
};

export default DefenceUser;
