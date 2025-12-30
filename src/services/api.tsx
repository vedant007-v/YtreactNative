import axios from 'axios';
import { ApiResponse } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

export const fetchUsers = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch user data');
  }
};