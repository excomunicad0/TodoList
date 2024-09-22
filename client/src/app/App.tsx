import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import type { AxiosError } from 'axios';
import { AppContext } from './provider/AppContext';
import type { Task } from '../entities/Task/type/type';
import type { User } from '../entities/User/type/userType';
import type { TaskResponse } from '../entities/Task/type/taskResponse';
import axiosInstance from '../services/axiosInstance';
import AppRouters from './provider/AppRoutes';
import Navbar from '../widgets/navbar/Navbar';

import './App.css';

function App(): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const stateUser = useMemo(
    () => ({ user, setUser, tasks, setTasks }),
    [user, tasks]
  );

  const checkUser = async () => {
    try {
      const response = await axiosInstance.get('/tokens/refresh');
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
      }
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get<TaskResponse>('/tasks');
      if (response.status === 200) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
      } else {
        setError('Some error');
      }
    }
  };

  useEffect(() => {
    checkUser();
    getAllTasks();
  }, []);

  return (
    <AppContext.Provider value={stateUser}>
      <Navbar />
      <AppRouters />
    </AppContext.Provider>
  );
}

export default App;
