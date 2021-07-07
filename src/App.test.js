import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import App, { calcularNovoSaldo } from "./App";
import Conta from "./conta/Conta";

import api from "./api";
jest.mock("./api");

describe("Componente: <App/>", () => {
  describe("Quando abrir o app do banco mostrar o ", () => {
    it("nome do banco", () => {
      render(<App />);
      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });

    it("botão realizar operação", () => {
      render(<App />);
      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });

    it("saldo da conta", () => {
      render(<App />);
      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });
  });

  describe("Quando eu realizo uma transação de", () => {
    it("saque, o saldo diminui", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(100);
    });

    it("saque, a transação deve ser realizada", () => {
      render(<App />);

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botaoTransacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");

      fireEvent.click(transacao, { target: { value: "saque" } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe("R$ 990");
    });

    it("depósito, o saldo aumenta", () => {
      const valores = {
        transacao: "depósito",
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(100);
    });
  });

  describe("Requisições para API", () => {
    it("Exibir lista de transações através da API", async () => {
      api.listaTransacoes.mockResolvedValue([
        {
          valor: 10,
          transacao: "saque",
          data: "10/08/2020",
          id: 1,
        },
        {
          transacao: "deposito",
          valor: "20",
          data: "26/09/2020",
          id: 2,
        },
      ]);

      render(<App />);

      expect(await screen.findByText("saque")).toBeInTheDocument();
      expect(screen.getByTestId("transacoes").children.length).toBe(2);
    });
  });
});
