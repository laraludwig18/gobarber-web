import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImage from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImage} alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>

        <Input name="email" placeholder="Digite seu e-mail" icon={FiMail} />
        <Input
          name="password"
          type="password"
          placeholder="Digite sua senha"
          icon={FiLock}
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="criar">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
