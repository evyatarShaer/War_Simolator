import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { UserModel } from "../types/userModel";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchUser = createAsyncThunk('users/fetchUsers', async (name?: string) => {
  if (!name) return
  try {
    const response = await axios.get<UserModel>(`${BASE_URL}api/users/${name}`);
    return response.data as UserModel;
  } catch (error) {
    console.error("Error fetching user:", error);
    return;
  }
});

export const sendMissile = createAsyncThunk('users/sendMissile', async ({ userId, missileId }: { userId: string, missileId: string }) => {
    const token = localStorage.getItem('token');
    if (!token) return [];
    
    try {
      const response = await axios.put(`${BASE_URL}api/users/${userId}`, { resourceId: missileId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.missiles || [];
    } catch (error) {
      console.error("Error sending missile:", error);
      return false; 
    }
  }
);
