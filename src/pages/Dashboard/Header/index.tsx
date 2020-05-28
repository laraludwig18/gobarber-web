import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../hooks/auth';

import logoImg from '../../../assets/logo.svg';
import { Container, Content, Profile } from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Profile>
          <img src={user.avatarUrl} alt={user.name} />

          <div>
            <span>Bem-vindo,</span>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </Content>
    </Container>
  );
};

export default Header;
