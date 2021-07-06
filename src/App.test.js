import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

import App, {calcularNovoSaldo} from './App';


describe('Componente: <App/>', () => {
  describe('Quando abrir o app do banco mostrar o ', () => {
    it('nome do banco', () => {
      render(<App/>);
      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    });

    it('botão realizar operação', () => {
      render(<App/>);
      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    });

    it('saldo da conta', () => {
      render(<App/>);
      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    });
  });

  describe('Quando eu realizo uma transação de', () => {
    it('saque, o saldo diminui', () => {
      const valores = {
        transacao: 'saque',
        valor: 50
      }
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(100);
    });

    it('saque, a transação deve ser realizada', () => {
      const {getByText, getByTestId, getByLabelText} = render(<App/>);

      const saldo = getByText('R$ 1000');
      const transacao = getByLabelText('Saque');
      const valor = getByTestId('valor');
      const botaoTransacao = getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000');

      fireEvent.click(transacao, { target: {value: 'saque'}});
      fireEvent.change(valor, {target: {value: 10}});
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe('R$ 990');
    });    
    
    it('depósito, o saldo aumenta', () => {
      const valores = {
        transacao: 'depósito',
        valor: 50
      }
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(100);
    });
  })
})