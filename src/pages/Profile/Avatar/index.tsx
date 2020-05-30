import React, { useCallback, ChangeEvent } from 'react';
import { FiCamera } from 'react-icons/fi';

import { useAuth } from '../../../context/auth';
import { useToast } from '../../../context/toast';
import { useApiClient } from '../../../services/apiClient';

import { AvatarInput } from './styles';

const Avatar: React.FC = () => {
  const api = useApiClient();
  const { addToast } = useToast();
  const {
    user: { name, avatarUrl },
    updateUser,
  } = useAuth();

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();

      if (e.target.files) {
        formData.append('avatar', e.target.files[0]);

        const { data } = await api.patch('users/avatar', formData);
        updateUser(data);

        addToast({ type: 'success', title: 'Avatar atualizado!' });
      }
    },
    [addToast, api, updateUser],
  );

  return (
    <AvatarInput>
      <img src={avatarUrl} alt={name} />
      <label htmlFor="avatar">
        <FiCamera />

        <input type="file" id="avatar" onChange={handleAvatarChange} />
      </label>
    </AvatarInput>
  );
};

export default Avatar;
