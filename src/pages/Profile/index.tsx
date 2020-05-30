import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { object, string, ValidationError, ref } from 'yup';
import { useHistory, Link } from 'react-router-dom';

import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';
import { useApiClient } from '../../services/apiClient';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Avatar from './Avatar';

import { Container, Content } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const api = useApiClient();
  const { addToast } = useToast();
  const history = useHistory();

  const {
    user: { name, email },
    updateUser,
  } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = object().shape({
          name: string().required('Nome obrigatório'),
          email: string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          oldPassword: string(),
          password: string().when('oldPassword', {
            is: (val) => !!val.length,
            then: string().min(6, 'No mínimo 6 dígitos'),
            otherwise: string(),
          }),
          passwordConfirmation: string()
            .when('oldPassword', {
              is: (val) => !!val.length,
              then: string().min(6, 'No mínimo 6 dígitos'),
              otherwise: string(),
            })
            .oneOf([ref('password'), null], 'Senhas não coincidem'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = data?.password
          ? data
          : {
              name: data.name,
              email: data.email,
            };

        const response = await api.put('profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Suas informações foram alteradas com sucesso!',
        });
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente.',
        });
      }
    },
    [addToast, api, history, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name,
            email,
          }}
          onSubmit={handleSubmit}
        >
          <Avatar />
          <h1>Meu perfil</h1>

          <Input name="name" placeholder="Digite seu nome" icon={FiUser} />
          <Input name="email" placeholder="Digite seu e-mail" icon={FiMail} />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="oldPassword"
            type="password"
            placeholder="Digite sua senha atual"
            icon={FiLock}
          />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua nova senha"
            icon={FiLock}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="Digite a confirmação da nova senha"
            icon={FiLock}
          />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
