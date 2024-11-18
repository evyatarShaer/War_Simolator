import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// המצב ההתחלתי של הצ'אט
interface ChatState {
  messages: string[];
}

const initialState: ChatState = {
  messages: [],
};

// יצירת slice לניהול הצ'אט
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload); // הוספת הודעה למצב
    },
  },
});

// יצוא של הפעולות וה-reducer
export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
