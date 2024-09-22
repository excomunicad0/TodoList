import React, { useContext } from 'react';
import './MainPage.css';
import { AppContext } from '../../app/provider/AppContext';

function MainPage(): JSX.Element {
  const { user } = useContext(AppContext);
  return (
    <div className='full-screen'>
      <h1 className='title'>{`WELCOME ${user.name.toUpperCase()}`} </h1>
    </div>
  );
}

export default MainPage;
