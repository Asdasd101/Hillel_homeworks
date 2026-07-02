import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserProfile from './UserProfile';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('UserProfile Component', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('відображає індикатор завантаження під час виконання запиту', () => {
    mockFetch.mockReturnValue(new Promise(() => {}));
    
    render(<UserProfile />);
    
    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
  });

  it('коректно відображає дані користувача після успішного запиту', async () => {
    const fakeUser = { name: 'John Doe', email: 'john@example.com' };
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => fakeUser,
    });

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('Завантаження...')).not.toBeInTheDocument();
  });

  it('відображає повідомлення про помилку у разі невдалого запиту', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByText('Помилка: Не вдалося завантажити дані')).toBeInTheDocument();
    });
  });
});