import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./register.module.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [region, setRegion] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}auth/register`, {
        username: name,
        password,
        organization: organization,
      });

      console.log(response.data);

      if (response.data) {
        alert("נרשמת בהצלחה");
      } else {
        alert("ההרשמה נכשלה. אנא בדוק את הנתונים שהזנת.");
      }
    } catch (error) {
      console.error("שגיאה בתהליך ההרשמה:", error);
    }
  };
  return (
    <div className={styles.div}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.h1}>הרשמה</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="שם משתמש"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className={styles.select}
          value={organization}
          onChange={(e) => {
            setOrganization(e.target.value);
            if (e.target.value === "IDF") {
              setRegion("");
            }
          }}
          required
        >
          <option value="">בחר ארגון</option>
          <option value="IDF">IDF</option>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="IRGC">IRGC</option>
          <option value="Houthis">Houthis</option>
        </select>
        {organization === "IDF" && (
          <select
            className={styles.select}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          >
            <option value="">בחר אזור</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Center">Center</option>
            <option value="West Bank">West Bank</option>
          </select>
        )}
        <button className={styles.button} type="submit">
          שלח
        </button>
        <Link to="/">כניסה</Link>
      </form>
    </div>
  );
};

export default Register;
