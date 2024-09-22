import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Task } from '../../entities/Task/type/taskType';
import type { User } from '../../entities/User/type/userType';
import type { Category } from '../../entities/Category/type/categoryType';

type InitStateUser = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
};

export const initState: InitStateUser = {
  user: undefined,
  setUser: () => {},
  tasks: [],
  setTasks: () => {},
  categories: [],
  setCategories: () => {},
};

export const AppContext = createContext(initState);
