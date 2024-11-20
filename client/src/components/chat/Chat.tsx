import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { addMessage } from '../../store/featurs/chatSlice';
import { RootState } from '../../store/store';
import { MessageModel } from '../../types/messageModel';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const socket = io(BASE_URL); // חיבור לשרת Socket.io

export const Chat: React.FC = () => {
  const dispatch = useDispatch(); // התחברות ל-Redux Dispatch
  const messages = useSelector((state: RootState) => state.chat.messages); // שליפת ההודעות מ-Redux
  const [message, setMessage] = useState<MessageModel>({ rocket: '', timeToHit: 0, status: '' }); // ניהול מצב מקומי של ההודעה החדשה

  useEffect(() => {
    // האזנה להודעות מהשרת
    socket.on('chat message', (msg: MessageModel) => {
      dispatch(addMessage(msg)); // הוספת ההודעה למצב דרך Redux
    });

    return () => {
      socket.off('chat message'); // ניקוי מאזין בעת יציאה
    };
  }, [dispatch]);

  const sendMessage = () => {
    if (message.rocket.trim() !== '' && message.timeToHit > 0) { // בדיקה אם כל השדות מלאים
      socket.emit('chat message', message); // שליחת ההודעה לשרת
      setMessage({ rocket: '', timeToHit: 0, status: '' }); // איפוס השדה
    }
  };

  return (
    <div>
    <ul>
      {messages.map((msg, index) => (
        <li key={index}>
          Rocket: {msg.rocket}, Time to hit: {msg.timeToHit}, Status: {msg.status}
        </li>
      ))}
    </ul>
    <input
      value={message.rocket}
      onChange={(e) => setMessage({ ...message, rocket: e.target.value })}
      placeholder="Enter rocket name"
    />
    <input
      type="number"
      value={message.timeToHit}
      onChange={(e) => setMessage({ ...message, timeToHit: Number(e.target.value) })}
      placeholder="Enter time to hit"
    />
    <input
      value={message.status}
      onChange={(e) => setMessage({ ...message, status: e.target.value })}
      placeholder="Enter status"
    />
    <button onClick={sendMessage}>Send</button>
  </div>
  );
};

export default Chat;
