import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import * as Components from "../utils/styledComponents";
import { isUserLoggedIn } from "../utils";
import { port } from "../utils/apikey";

interface ForgotDetails {
  isOpen: boolean;
  closeModal: () => void;
}

const ForgotPassword = ({ isOpen, closeModal }: ForgotDetails) => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmSenha: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmSenha) {
      setError("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://${port}/api2/auth/reset-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: formData.email, senha: formData.senha }),
      });

      if (!response.ok) throw new Error("Falha ao redefinir a senha. Tente novamente.");

      setSuccess("Senha redefinida com sucesso! Você pode fazer login agora.");
      setTimeout(() => closeModal(), 3000);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="car-details__dialog-panel">
                  <button type="button" onClick={closeModal} className="car-details__close-btn">
                    <img src="close.svg" alt="close" className="w-5 h-5 object-contain" />
                  </button>

                  {isLoggedIn ? (
                    <p style={{ color: "blue" }}>Você já está logado! Não é necessário redefinir a senha.</p>
                  ) : (
                    <Components.Form onSubmit={handleSubmit}>
                      <Components.Title>Digite seu email e a nova senha</Components.Title>
                      <Components.Input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                      <Components.Input type="password" name="senha" placeholder="Nova senha" required value={formData.senha} onChange={handleChange} />
                      <Components.Input type="password" name="confirmSenha" placeholder="Confirme a nova senha" required value={formData.confirmSenha} onChange={handleChange} />
                      {error && <p style={{ color: "red" }}>{error}</p>}
                      {success && <p style={{ color: "green" }}>{success}</p>}
                      <Components.Button type="submit" disabled={loading}>{loading ? "Enviando..." : "Atualizar senha"}</Components.Button>
                    </Components.Form>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ForgotPassword;
