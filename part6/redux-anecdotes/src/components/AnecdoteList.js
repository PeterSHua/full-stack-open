import { useSelector, useDispatch } from 'react-redux';
import { updateAnecdoteVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes;
    }

    const rgx = new RegExp(filter, 'i');
    return anecdotes.filter((a) => {
      return rgx.test(a.content);
    });
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);

    dispatch(updateAnecdoteVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;
