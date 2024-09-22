import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../page/RegistrationPage/RegistrationPage';
import AuthorizationPage from '../../page/AuthorizationPage/AuthorizationPage';
import TasksPage from '../../page/TasksPage/TasksPage';


function AppRouters(): JSX.Element {
  return (
    <Routes>
      <Route path='/' />
      <Route path='/registration' element={<RegistrationPage />} />
      <Route path='/authorization' element={<AuthorizationPage />} />
      <Route path='/tasks' element={<TasksPage />} />
    </Routes>
  );
}

export default AppRouters;
