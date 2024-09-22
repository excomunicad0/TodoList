/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/consistent-type-imports */

import axios, { AxiosError } from 'axios';
import React, { useContext, useState } from 'react';
import { addTask } from '../model/taskServices';
import { AppContext } from '../../../app/provider/AppContext';
import { Task } from '../type/taskType';

import './styles/TaskFromAdd.css';

function TaskFromAdd(): JSX.Element {
  const { setTasks, user, categories } = useContext(AppContext);
  const [title, setTitle] = useState<Task['title']>('');
  const [description, setDescription] = useState<Task['description']>('');
  // const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  const handleAddSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const newTask: Task = await addTask({
        title,
        description,
        isCompleted: false,
        userId: user.id,
        categoryId: 1,  //  Number(selectedCategoryId)
        priorityId: 1,
      });
      setTasks((prev) => [...prev, newTask]);
      setTitle('');
      setDescription('');
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
    <div className='task-add-form'>
      <form onSubmit={handleAddSubmit}>
        <input
          className='input-field'
          placeholder='Название'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className='input-field'
          placeholder='Описание'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value='/'>Выберите категорию</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select> */}

        <button className='save-btn' type='submit'>
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default TaskFromAdd;
