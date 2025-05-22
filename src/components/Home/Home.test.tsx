import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/mocks/router';
import '@/utils/i18n';
import Hero from './Hero';
import userEvent from '@testing-library/user-event';

const mockNewRoom = vi.fn();
const mockNavigate = vi.fn();

vi.mock('@/hooks/useCreateRoom', () => ({
  useCreateRoom: () => ({
    createNewRoom: () => {
      mockNewRoom();
      mockNavigate({ to: '/rooms/123' });
    }
  })
}));

vi.mock('@tanstack/react-router', async () => {
  const actual = await import('@tanstack/react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('Hero', () => {
  beforeEach(() => {
    mockNewRoom.mockClear();
    mockNavigate.mockClear();
    render(<RouterProvider router={router} defaultComponent={Hero} />);
  });

  it('should call createNewRoom when the button is clicked', async () => {
    const createRoomButton = screen.getByTestId('create-room-button');

    await userEvent.click(createRoomButton);

    expect(mockNewRoom).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/rooms/123' });
  });
});
