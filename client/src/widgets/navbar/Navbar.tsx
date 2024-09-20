import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../app/provider/AppContext';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';
import './Navbar.css';

function Navbar(): JSX.Element {
  const { user, setUser } = useContext(AppContext);

  const handleLogOut = async () => {
    const response = await axiosInstance.delete('/tokens/logout');
    if (response.status === 200) {
      setUser(undefined);
      setAccessToken('');
      return;
    }
  };

  return (
    <nav className='nav'>
      <h1>TodoList</h1>
      <ul>
        <li className='nav-link'>
          <NavLink to='/'>Главная</NavLink>
        </li>
        <li className='nav-link'>
          <NavLink to='/tasks'>Задачи</NavLink>
        </li>
        <li className='nav-link'>
          <NavLink to='/registration'>Регистрация</NavLink>
        </li>
        <li className='nav-link'>
          <NavLink to='/authorization'>Авторизация</NavLink>
        </li>
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
