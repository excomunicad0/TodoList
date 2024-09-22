import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import type { AxiosError } from 'axios';
import { AppContext } from './provider/AppContext';
import type { Task } from '../entities/Task/type/taskType';
import type { User } from '../entities/User/type/userType';
import type { TaskResponse } from '../entities/Task/type/taskResponse';
import type { RegistrationResponse } from '../entities/User/type/userResponse';
import type { Category } from '../entities/Category/type/categoryType';
import type { CategoryResponse } from '../entities/Category/type/categoryResponse';
import axiosInstance from '../services/axiosInstance';
import AppRouters from './provider/AppRoutes';
import Navbar from '../widgets/navbar/Navbar';

import './App.css';

function App(): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const stateUser = useMemo(
    () => ({ user, setUser, tasks, setTasks, categories, setCategories }),
    [user, tasks, categories]
  );

  const checkUser = async (): Promise<void> => {
    try {
      const response =
        await axiosInstance.get<RegistrationResponse>('/tokens/refresh');
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
      }
    }
  };

  const getAllTasks = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<TaskResponse>('/tasks');
      if (response.status === 200) {
        setTasks(response.data.tasks);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
      } else {
        setError('Some error');
      }
    }
  };

  const getAllCategories = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<CategoryResponse>('/categories');
      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
      } else {
        setError('Some error');
      }
    }
  };

  useEffect(() => {
    checkUser();
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllTasks();
  }, [user]);

  return (
    <AppContext.Provider value={stateUser}>
      <Navbar />
      <AppRouters />
    </AppContext.Provider>
  );
}

export default App;
