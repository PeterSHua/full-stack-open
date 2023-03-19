import { useState, forwardRef, useImperativeHandle } from 'react';

const Blog = forwardRef(({
  blog,
  updateBlog
}, refs) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [detailsVisible, setDetailsVisible] = useState('none');

  const hideWhenVisible = {
    display: detailsVisible ? 'none' : ''
  };

  const showWhenVisible = {
    display: detailsVisible ? '' : 'none'
  };

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleDetailsVisibility
    };
  });

  let handleLike = () => {
    let updatedBlog = { ...blog };
    updatedBlog.likes += 1;

    updateBlog(updatedBlog);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <span style={hideWhenVisible}>
        <button onClick={toggleDetailsVisibility}>hide</button>
        <br />
        {blog.url} <br />
        likes {blog.likes} <button onClick={handleLike}>like</button><br />
        {blog.user.name}
      </span>

      <span style={showWhenVisible}>
        <button onClick={toggleDetailsVisibility}>show</button>
      </span>

    </div>
  );
});

Blog.displayName = 'Blog';

export default Blog;
