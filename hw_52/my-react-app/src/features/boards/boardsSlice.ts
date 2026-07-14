import { createSlice } from '@reduxjs/toolkit';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: { items: {} },
  reducers: {},
});

export default boardsSlice.reducer;