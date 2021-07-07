import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Conta from "./Conta";

describe("Componente: <Conta/>", () => {
  it("Exibir o saldo da conta", () => {
    render(<Conta saldo={1000} />);
    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toBe("R$ 1000");
  });
  it("Executar a função de realizar transação quando o botão for clicado", () => {
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

    fireEvent.click(screen.getByText("Realizar operação"));

    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });
});
