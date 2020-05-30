import React, { useRef, useCallback, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { object, string, ValidationError, ref } from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { useApiClient } from '../../services/apiClient';
import { useToast } from '../../context/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImage from '../../assets/logo.svg';
import { Container, Content, AnimatedContainer, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const api = useApiClient();
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const getToken = useCallback(() => {
    const query = new URLSearchParams(location.search);
    return query.get('token');
  }, [location.search]);

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = object().shape({
          password: string().required('Senha obrigatória'),
          passwordConfirmation: string().oneOf(
            [ref('password'), null],
            'Senhas não coincidem',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = getToken();
        if (!token) {
          throw new Error();
        }

        const { password, passwordConfirmation } = data;

        await api.post('/password/reset', {
          password,
          passwordConfirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, api, getToken, history],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logoImage} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              type="password"
              placeholder="Digite sua nova senha"
              icon={FiLock}
            />

            <Input
              name="passwordConfirmation"
              type="password"
              placeholder="Digite a confirmação da senha"
              icon={FiLock}
            />

            <Button type="submit" loading={loading}>
              Alterar senha
            </Button>
          </Form>
        </AnimatedContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
