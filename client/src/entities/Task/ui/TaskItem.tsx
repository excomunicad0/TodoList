/* eslint-disable @typescript-eslint/no-misused-promises */

import axios from 'axios';
import React, { useContext, useState } from 'react';
import type { AxiosError } from 'axios';
import type { Task } from '../type/taskType';
import { AppContext } from '../../../app/provider/AppContext';
import ModalWindow from '../../../shared/ui/modal/ModalWindow';
import TaskFropUp from './TaskFromUp';
import axiosInstance from '../../../services/axiosInstance';

import './styles/TaskItem.css';

type TaskItemProps = {
  task: Task;
};

function TaskItem({ task }: TaskItemProps): JSX.Element {
  const { user, tasks, setTasks } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isActive = (): void => {
    setActive((prev) => !prev);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      const response = await axiosInstance.delete(`/tasks/${task.id}`);
      if (response.status === 200) {
        setTasks(tasks.filter((t) => t.id !== task.id));
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
      }
    }
  };

  const toggleStatus = async (): Promise<void> => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      await axiosInstance.put(`/tasks/${task.id}`, updatedTask);
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
      }
    }
  };

  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <h3>{task.description}</h3>

      <div className='btn-container'>
        {user && <button className='update-btn' type='button' onClick={isActive}>
          Обновить
        </button>}
        <ModalWindow active={active} setActive={setActive}>
          <TaskFropUp task={task} setActive={setActive} />
        </ModalWindow>
      </div>

      {user && <button className='status-btn' type='button' onClick={toggleStatus}>
        Статус: {task.isCompleted ? 'Выполнено' : 'Не выполнено'}
      </button>}
      {user && (
        <button className='delete-btn' type='button' onClick={handleDelete}>
          Удалить
        </button>
      )}
    </div>
  );
}

export default TaskItem;
