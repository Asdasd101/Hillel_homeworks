import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { fetchTasks } from './tasksThunks';
import { Task } from '../../types';
import { RootState } from '../../app/store';

interface TasksState {
  items: Record<string, Task>;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: {},
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items[action.payload.id] = action.payload;
    },
    moveTask: (state, action: PayloadAction<{ taskId: string; newStatus: 'todo' | 'inprogress' | 'done' }>) => {
      const { taskId, newStatus } = action.payload;
      if (state.items[taskId]) {
        state.items[taskId].status = newStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        action.payload.forEach((task) => {
          state.items[task.id] = task;
        });
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Щось пішло не так';
      });
  },
});

export const { addTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;

const selectTasksItems = (state: RootState) => state.tasks.items;

export const selectTasksByStatus = (status: 'todo' | 'inprogress' | 'done') =>
  createSelector([selectTasksItems], (items) =>
    Object.values(items).filter((task) => task.status === status)
  );