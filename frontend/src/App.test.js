import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders task manager heading', () => {
  render(<App />);
  const heading = screen.getByText(/Task Manager/i);
  expect(heading).toBeInTheDocument();
});

test('adds a new task and displays it', async () => {
  axios.get.mockResolvedValueOnce({ data: [] });
  axios.post.mockResolvedValueOnce({});
  axios.get.mockResolvedValueOnce({ data: [{ id: 1, text: 'New Task', dueDate: '' }] });

  render(<App />);

  const input = screen.getByPlaceholderText('Add a task');
  fireEvent.change(input, { target: { value: 'New Task' } });

  const addButton = screen.getByText('Add');
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });
});
