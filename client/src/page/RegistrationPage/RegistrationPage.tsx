import type { AxiosError } from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/provider/AppContext';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';
import type { User } from '../../entities/User/type/userType';
import type { RegistrationResponse } from '../../entities/User/type/userResponse';

function RegistrationPage(): JSX.Element {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState<User['name']>('');
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<User['password']>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError('Все поля обязательны для заполнения');
      return;
    }

    try {
      const response = await axiosInstance.post<RegistrationResponse>(
        '/auth/registration',
        {
          name,
          email,
          password,
        }
      );

      if (response.status === 201) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
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
    <div className='reg-main'>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Имя'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email'
          placeholder='Почта'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Зарегистрировать</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default RegistrationPage;
