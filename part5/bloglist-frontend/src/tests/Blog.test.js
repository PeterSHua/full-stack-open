import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';

test('renders content', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 7,
    user: { name: 'name' }
  };

  render(<Blog blog={blog} />);

  let element = await screen.getByText('title', { exact: false });
  element = screen.getByText('author', { exact: false });

  element = screen.getByText('url', { exact: false });
  expect(element).toHaveStyle('display: none');
  element = screen.getByText('likes', { exact: false });
  expect(element).toHaveStyle('display: none');
});
