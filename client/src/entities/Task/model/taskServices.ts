/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable import/prefer-default-export */

import axiosInstance from '../../../services/axiosInstance';
import type { Task, TaskWithoutId } from '../type/taskType';

export const addTask = async (task: TaskWithoutId): Promise<Task> => {
  const response = await axiosInstance.post('/tasks', task);
  return response.data.task as Task;
};

export const updateTask = async (task: TaskWithoutId): Promise<void> => {
  const response = await axiosInstance.put(`/tasks/${task.id}`, task);
  return response.data;
};
