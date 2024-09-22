import React, { useEffect, useMemo, useState } from 'react';
import AppRouters from './provider/AppRoutes';
import type { User } from '../entities/User/type/userType';
import { AppContext } from './provider/AppContext';
import axiosInstance from '../services/axiosInstance';

import './App.css';
import Navbar from '../widgets/navbar/Navbar';

function App(): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const stateUser = useMemo(() => ({ user, setUser }), [user]);

  const checkUser = async () => {
    const response = await axiosInstance.get('/tokens/refresh');
    if (response.status === 200) {
      setUser(response.data.user);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppContext.Provider value={stateUser}>
      <Navbar />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AppRouters />
    </AppContext.Provider>
  );
}

export default App;
