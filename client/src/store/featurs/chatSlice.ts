import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageModel } from '../../types/messageModel';

// המצב ההתחלתי של הצ'אט
interface ChatState {
  messages: MessageModel[];
}

const initialState: ChatState = {
  messages: [],
};

// יצירת slice לניהול הצ'אט
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageModel>) => {
      state.messages.push(action.payload); // הוספת הודעה למצב
    },
  },
});

// יצוא של הפעולות וה-reducer
export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
