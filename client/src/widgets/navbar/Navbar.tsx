/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/provider/AppContext';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';
import './Navbar.css';

function Navbar(): JSX.Element {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogOut = async (): Promise<void> => {
    const response = await axiosInstance.delete('/tokens/logout');
    if (response.status === 200) {
      setUser(undefined);
      setAccessToken('');
      navigate('/');
    }
  };

  return (
    <nav className='nav'>
      <h1>TodoList</h1>
      <ul>
        <li className='nav-link'>
          <NavLink to='/'>Главная</NavLink>
        </li>
        {user && (
          <li className='nav-link'>
            <NavLink to='/tasks'>Задачи</NavLink>
          </li>
        )}
        {user && (
          <li className='nav-link'>
            <NavLink to='/categories'>Категории</NavLink>
          </li>
        )}
        {!user && (
          <li className='nav-link'>
            <NavLink to='/registration'>Регистрация</NavLink>
          </li>
        )}
        {!user && (
          <li className='nav-link'>
            <NavLink to='/authorization'>Авторизация</NavLink>
          </li>
        )}
      </ul>
      {user && (
        <button className='nav-btn' onClick={handleLogOut}>
          Выйти
        </button>
      )}
    </nav>
  );
}

export default Navbar;
