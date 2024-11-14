import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { UserModel } from "../types/userModel";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchUser = createAsyncThunk('users/fetchUsers', async (name: string) => {
  try {
    const response = await axios.get<UserModel>(`${BASE_URL}api/users/${name}`);
    return response.data as UserModel;
  } catch (error) {
    console.error("Error fetching user:", error);
    return;
  }
});