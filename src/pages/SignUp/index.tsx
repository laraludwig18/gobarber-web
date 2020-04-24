import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImage from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImage} alt="GoBarber" />

      <form>
        <h1>Faça seu cadastro</h1>

        <Input name="name" placeholder="Digite seu nome" icon={FiUser} />

        <Input name="email" placeholder="Digite seu e-mail" icon={FiMail} />

        <Input
          name="password"
          type="password"
          placeholder="Digite sua senha"
          icon={FiLock}
        />

        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="criar">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>
  </Container>
);

export default SignIn;
