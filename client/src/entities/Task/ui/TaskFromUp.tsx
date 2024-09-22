import axios from 'axios';
import React, { useContext, useState } from 'react';
import type { AxiosError } from 'axios';
import type { Task } from '../type/type';
import { AppContext } from '../../../app/provider/AppContext';
import axiosInstance from '../../../services/axiosInstance';

import './styles/TaskFromUp.css';

type TaskFropUpProps = {
  task: Task;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function TaskFropUp({ task, setActive }: TaskFropUpProps): JSX.Element {
  const { setTasks } = useContext(AppContext);
  const [title, setTitle] = useState<Task['title']>(task.title || '');
  const [description, setDescription] = useState<Task['description']>(
    task.description || ''
  );
  const [error, setError] = useState<string | null>(null);

  const handleUpSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put<{task: Task}>(`/tasks/${task.id}`, {
        title,
        description,
      });
      if (response.status === 200) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === response.data.task.id ? response.data.task : t
          )
        );
        setActive(false);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  };

  return (
    <div className='task-up'>
      <form onSubmit={handleUpSubmit}>
        <input
          placeholder='название'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder='описание'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p className='error'>{error}</p>}
        <button type='submit'>Сохранить</button>
      </form>
    </div>
  );
}

export default TaskFropUp;
