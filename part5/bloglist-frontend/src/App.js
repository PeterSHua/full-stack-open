import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };
  const newBlogRef = useRef();

  let addBlog = (newBlog) => {
    newBlogRef.current.toggleVisibility();

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        returnedBlog.user = user;
        setBlogs(blogs.concat(returnedBlog));
      });
  };

  let updateBlog = (blogToUpdate) => {
    blogService
      .update(blogToUpdate)
      .then((returnedBlog) => {
        returnedBlog.user = blogToUpdate.user;

        let newBlogs = blogs.map((blog) => {
          if (blog.id === blogToUpdate.id) {
            return returnedBlog;
          } else {
            return blog;
          }
        });

        setBlogs(newBlogs);
      });
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
              password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification message={successMessage} />
      <h2>blogs</h2>
      <div>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="create" ref={newBlogRef}>
        <NewBlog
          setSuccessMessage={setSuccessMessage}
          createBlog={addBlog}
        />
      </Togglable>

      {blogs.map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
        />
      )}
    </div>
  );
};

export default App;
