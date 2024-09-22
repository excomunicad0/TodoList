import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/provider/AppContext';
import { AxiosError, isAxiosError } from 'axios';
import type { User } from '../../entities/User/type/userType';
import axiosInstance from '../../services/axiosInstance';
import './AuthorizationPage.css';

function AuthorizationPage(): JSX.Element {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate('');
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<User['password']>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/authorization', {
        email,
        password,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  };

  return (
    <div className='auth-main'>
      <h1>Авторизация</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='почта'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Войти</button>
      </form>
    </div>
  );
}

export default AuthorizationPage;
