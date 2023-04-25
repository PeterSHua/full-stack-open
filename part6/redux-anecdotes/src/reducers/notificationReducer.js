import { createSlice } from '@reduxjs/toolkit';
const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return '';
    }
  },
});

export const {
  updateNotification,
  clearNotification
} = notificationSlice.actions;

export default notificationSlice.reducer;

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(updateNotification(content));

    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};
