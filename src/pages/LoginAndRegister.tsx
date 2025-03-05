import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Components from '../utils/styledComponents';
import { login, register } from '../utils/index';
import { LoginRequest, User } from '../types';
import ForgotPassword from '../components/ForgotPassword';
import { isUserLoggedIn } from '../utils/index';

const LoginAndRegisterForm = () => {
    const [signIn, setSignIn] = useState<boolean>(true);
    const [formData, setFormData] = useState<User>({
        nome: '',
        telefone: '',
        rua: '',
        numero: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn()) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handlePasswordCheck = (): boolean => {
        return formData.password === confirmPassword;
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!handlePasswordCheck()) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
            await register(formData);
            alert('Conta criada com sucesso! Faça login para continuar.');
            setSignIn(true);
        } catch (error) {
            alert('Erro ao criar conta. Tente novamente.');
        }
    };

    const [loginData, setLoginData] = useState<LoginRequest>({
        login: '',
        password: '',
    });

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await login(loginData);
            localStorage.setItem('token', response.token);
            navigate('/');
        } catch (error) {
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <>
            <Components.Container>
                <Components.SignUpContainer $signinIn={signIn}>
                    <Components.Form onSubmit={handleRegister}>
                        <Components.Title>Criar conta</Components.Title>

                        {Object.keys(formData).map((key) => (
                            <Components.Input
                                key={key}
                                type={key === 'email' ? 'email' : key === 'password' ? 'password' : 'text'}
                                name={key}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                required
                                value={formData[key as keyof User]}
                                onChange={handleChange}
                            />
                        ))}

                        <Components.Input
                            type="password"
                            placeholder="Repita sua senha"
                            required
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />

                        <Components.Button type="submit">Criar conta</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer $signinIn={signIn}>
                    <Components.Form onSubmit={handleLogin}>
                        <Components.Title>Login</Components.Title>
                        <Components.Input
                            type="email"
                            name="login"
                            placeholder="Email"
                            required
                            value={loginData.login}
                            onChange={handleLoginChange}
                        />
                        <Components.Input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            required
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                        <Components.Anchor onClick={() => setIsOpen(true)} href="#">Esqueceu sua senha?</Components.Anchor>
                        <Components.Button type="submit">Login</Components.Button>
                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer $signinIn={signIn}>
                    <Components.Overlay $signinIn={signIn}>
                        <Components.LeftOverlayPanel $signinIn={signIn}>
                            <Components.Title>Bem-vindo de volta!</Components.Title>
                            <Components.Paragraph>
                                Para se manter conectado conosco, faça login na sua conta
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => setSignIn(true)}>
                                Login
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel $signinIn={signIn}>
                            <Components.Title>Olá, Amigo!</Components.Title>
                            <Components.Paragraph>
                                Digite suas credenciais e venha fazer parte dessa jornada conosco
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => setSignIn(false)}>
                                Criar conta
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>
                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
            <ForgotPassword isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </>
    );
};

export default LoginAndRegisterForm;
