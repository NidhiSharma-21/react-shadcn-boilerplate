import api from './axios';
import { handleApiError } from '../utils/ApiErrorHandler';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export const fetchProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await api.get<UserProfile>('/users/me');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to load profile');
    return null; 
  }
};

export const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
  try {
    await api.put('/users/me', data);
    return true;
  } catch (error) {
    handleApiError(error, 'Failed to update profile');
    return false;
  }
};

export const deleteAccount = async (): Promise<boolean> => {
  try {
    await api.delete('/users/me');
    return true;
  } catch (error) {
    handleApiError(error, 'Failed to delete account');
    return false;
  }
};