import { render, screen, fireEvent, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginAndRegisterForm from "../pages/LoginAndRegister";
import { login, register } from "../utils";
import "@testing-library/jest-dom";

jest.mock("../utils/index", () => ({
    isUserLoggedIn: jest.fn(),
    login: jest.fn(() => Promise.resolve({ token: "fakeToken" })),
    register: jest.fn(() => Promise.resolve()),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("LoginAndRegisterForm", () => {
  test("Deve exibir o formulário de login por padrão", () => {
    renderWithRouter(<LoginAndRegisterForm />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("Deve alternar para o formulário de registro ao clicar em Criar conta", () => {
    renderWithRouter(<LoginAndRegisterForm />);
    fireEvent.click(screen.getByRole("button", { name: "Criar conta" }));
    expect(screen.getByRole("heading", { name: "Criar conta" })).toBeInTheDocument();
  });

  test("Deve exibir um alerta se as senhas não coincidirem", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    renderWithRouter(<LoginAndRegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: "Criar conta" }));

    fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "123456" } });
    fireEvent.change(screen.getByPlaceholderText("Repita sua senha"), { target: { value: "654321" } });

    fireEvent.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(window.alert).toHaveBeenCalledWith("As senhas não coincidem!");
  });

  test("Deve chamar a função register ao enviar o formulário de registro", async () => {
    renderWithRouter(<LoginAndRegisterForm />);
    fireEvent.click(screen.getByRole("button", { name: "Criar conta" }));

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "user@email.com" } });
    fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "123456" } });
    fireEvent.change(screen.getByPlaceholderText("Repita sua senha"), { target: { value: "123456" } });

    const registerButton = screen.getAllByRole("button", { name: "Criar conta" }).find(btn => btn.tagName === "BUTTON");
    fireEvent.click(registerButton!);

    expect(register).toHaveBeenCalledWith(expect.objectContaining({
      email: "user@email.com",
      password: "123456",
    }));
  });

  test("Deve chamar a função login ao enviar o formulário de login", async () => {
    renderWithRouter(<LoginAndRegisterForm />);
  
    const loginContainer = screen.getByText("Login").closest("form");
    expect(loginContainer).not.toBeNull();
  
    fireEvent.change(within(loginContainer!).getByPlaceholderText("Email"), { target: { value: "teste@email.com" } });
    fireEvent.change(within(loginContainer!).getByPlaceholderText("Senha"), { target: { value: "123456" } });
  
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
  
    expect(login).toHaveBeenCalledWith({ login: "teste@email.com", password: "123456" });
  });
});
