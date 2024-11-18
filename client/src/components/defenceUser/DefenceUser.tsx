import React, { useEffect } from "react";
import { fetchUser, sendMissile } from "../../services/userApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import styles from "./defenceUser.module.css";

const DefenceUser: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);
  //const missile = useSelector((state: RootState) => state.missile.missiles);

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

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.h1}>{user?.organization.name} :שם הארגון</h1>
        <p className={styles.name}>{user?.username} :שם</p>
        <div className={styles.missile}>
          {user?.organization.resources.map((missile) => (
            <div key={missile.name} onClick={() => {
              dispatch(sendMissile({ userId: user._id, missileId: missile._id }));
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
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default DefenceUser;
