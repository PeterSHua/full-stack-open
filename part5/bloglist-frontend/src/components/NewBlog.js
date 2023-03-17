import { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlog = ({ setSuccessMessage, createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  let addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });

    setSuccessMessage(`${title} by ${author} added`);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

NewBlog.propTypes = {
  setSuccessMessage: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
};

export default NewBlog;
