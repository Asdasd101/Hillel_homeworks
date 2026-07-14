import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../types';

const fakeApiFetchTasks = (): Promise<Task[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve([
      { id: 'task-1', title: 'Налаштувати Redux Toolkit', description: 'Створити слайси та thunks', status: 'todo' }
    ]), 1000)
  );
};

export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fakeApiFetchTasks();
      return response;
    } catch (error) {
      return rejectWithValue('Не вдалося завантажити завдання з сервера');
    }
  }
);