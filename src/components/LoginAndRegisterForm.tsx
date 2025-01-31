import { useState } from 'react';
import * as Components from '../utils/styledComponents';

const LoginAndRegisterForm = () => {

    const [signIn, setSignIn] = useState(true);

  return (
    <Components.Container>
              <Components.SignUpContainer $signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Criar conta</Components.Title>
                      <Components.Input type='text' placeholder='Nome' />
                      <Components.Input type='email' placeholder='Email' />
                      <Components.Input type='password' placeholder='Senha' />
                      <Components.Input type='password' placeholder='Repita sua senha' />
                      <Components.Button>Criar conta</Components.Button>
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.SignInContainer $signinIn={signIn}>
                   <Components.Form>
                       <Components.Title>Login</Components.Title>
                       <Components.Input type='email' placeholder='Email' />
                       <Components.Input type='password' placeholder='Senha' />
                       <Components.Anchor href='#'>Esqueceu sua senha?</Components.Anchor>
                       <Components.Button>Login</Components.Button>
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
  )
}

export default LoginAndRegisterForm