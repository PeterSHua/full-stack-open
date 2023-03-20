import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    let filteredAnecdotes = state.anecdotes.filter((a) => {
      const regex = new RegExp(state.filter, 'i');
      return regex.test(a.content);
    });

    filteredAnecdotes.sort((a, b) => b.votes - a.votes);

    return filteredAnecdotes;
  });

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`you voted ${content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      )}
    </>
  )
};

export default AnecdoteList;
