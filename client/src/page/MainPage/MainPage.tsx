import React, { useContext } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../app/provider/AppContext';

function MainPage(): JSX.Element {
  const { user } = useContext(AppContext);
  return (
    <div className='full-screen'>
      {user ? (
        <h1 className='title'>{`WELCOME ${user.name.toUpperCase()}`}</h1>
      ) : (
        <div className='guest-message'>
          <h1 className='title'>Друг, зайди в систему</h1>
          <p>
            Или <Link className='link' to='/registration'>зарегистрируйся</Link>, если у тебя нет
            аккаунта.
          </p>
        </div>
      )}
    </div>
  );
}

export default MainPage;
