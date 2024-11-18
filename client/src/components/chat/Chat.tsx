import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { addMessage } from '../../store/featurs/chatSlice';
import { RootState } from '../../store/store';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const socket = io(BASE_URL); // חיבור לשרת Socket.io

export const Chat: React.FC = () => {
  const dispatch = useDispatch(); // התחברות ל-Redux Dispatch
  const messages = useSelector((state: RootState) => state.chat.messages); // שליפת ההודעות מ-Redux
  const [message, setMessage] = useState(''); // ניהול מצב מקומי של ההודעה החדשה

  useEffect(() => {
    // האזנה להודעות מהשרת
    socket.on('chat message', (msg: string) => {
      dispatch(addMessage(msg)); // הוספת ההודעה למצב דרך Redux
    });

    return () => {
      socket.off('chat message'); // ניקוי מאזין בעת יציאה
    };
  }, [dispatch]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('chat message', message); // שליחת ההודעה לשרת
      setMessage(''); // איפוס השדה
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
