import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Tela de Login', () => {
  it('A rota da página de login deve ser "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('Deve existir os inputs de email e password', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    expect(emailInput && passwordInput).toBeInTheDocument();
  });

  it('Deve existir um botão "Entrar", inicialmente desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('A página deve ser redirecionada para "/carteira" após login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'teste@email.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Página Wallet', () => {
  it('Deve haver um Header na página, contendo o email, valor inicial de 0 e BRL', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const userEmail = screen.getByTestId('email-field');
    const initialValue = screen.getByTestId('total-field');
    const BRL = screen.getByTestId('header-currency-field');

    expect(userEmail && initialValue && BRL).toBeInTheDocument();
  });

  it('Deve haver um botão adicionar despesa', () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(button).toBeInTheDocument();
  });

  it('A tabela deve ter um campo Descrição', () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });
    const descriptionTitle = screen.getByRole('columnheader', { name: /descrição/i });
    expect(descriptionTitle).toBeInTheDocument();
  });

  it('A API deve ser chamada', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(mockData)({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
});
