import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { RouterProvider } from '@tanstack/react-router';
import Header from '@/components/Header';
import { router } from '@/mocks/router';
import '@/utils/i18n';

describe('Language selection', () => {
  beforeEach(() => {
    render(<RouterProvider router={router} defaultComponent={Header} />);
  });
  it('should render the language menu item', async () => {
    const languageMenu = screen.getByTestId('language-menu-item');
    expect(languageMenu).toBeInTheDocument();
  });
  it('should render the language dropdown on menu item click', async () => {
    const languageMenu = screen.getByTestId('language-menu-item');
    const languageButton = screen.getByTestId('language-button');

    await userEvent.click(languageButton);

    const languageDropdown =
      within(languageMenu).getByTestId('language-dropdown');

    expect(languageDropdown).toBeInTheDocument();
  });
  it('should change the page language on dropdown item click', async () => {
    const languageMenu = screen.getByTestId('language-menu-item');
    const languageButton = screen.getByTestId('language-button');

    await userEvent.click(languageButton);

    const languageListItems = within(languageMenu).getAllByTestId(
      'language-list-items'
    );

    await userEvent.click(languageListItems[1]);

    const authMenu = screen.getAllByTestId('menu-items');

    expect(authMenu[1].textContent).toContain('Connexion');
  });
});
