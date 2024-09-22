import React, { useContext } from 'react';
import { AppContext } from '../../app/provider/AppContext';
import TaskItem from '../../entities/Task/ui/TaskItem';
import TaskFromAdd from '../../entities/Task/ui/TaskFromAdd';
import './TaskPage.css'

// ВЫВОД СПИСКА ЗАДАЧ
function TasksPage(): JSX.Element {
  const { user, tasks } = useContext(AppContext);

  return (
    <div className='tasks-container'>
      <h1>Tasks List</h1>
      {user && <TaskFromAdd />}
      <ul className='tasks-list'>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id} className='task-list-item'>
              <TaskItem task={task} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TasksPage;
