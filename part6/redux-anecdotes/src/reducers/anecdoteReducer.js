import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    changeAnecdote(state, action) {
      let anecdote = action.payload;

      return state.map((a) => {
        return a.id === anecdote.id ? anecdote : a;
      }).sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const {
  changeAnecdote,
  appendAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(createdAnecdote));
  };
};

export const updateAnecdoteVote = (anecdote) => {
  return async (dispatch) => {
    let toUpdate = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const updatedAnecdote = await anecdoteService.update(toUpdate);
    dispatch(changeAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
