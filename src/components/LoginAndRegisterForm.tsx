import { useState } from 'react';
import * as Components from '../utils/styledComponents';
import { login, register } from '../utils';
import { LoginRequest, User } from '../types';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handlePasswordCheck = (): boolean => {
        return formData.password === confirmPassword;
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!handlePasswordCheck()) {
            alert('As senhas não coincidem!');
            return;
        }

        register(formData);
    };

    const [loginData, setLoginData] = useState<LoginRequest>({
        email: '',
        password: '',
    });
    
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await login(loginData);
            console.log('Usuário logado com sucesso:', response);
        } catch (error) {
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    };
    

    return (
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
                        name="email"
                        placeholder="Email"
                        required
                        value={loginData.email}
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
                    <Components.Anchor href="#">Esqueceu sua senha?</Components.Anchor>
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
    );
};

export default LoginAndRegisterForm;