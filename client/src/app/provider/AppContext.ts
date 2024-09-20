import { createContext, Dispatch, SetStateAction } from 'react';
import type { Task } from '../../entities/Task/type/type';
import type { User } from '../../entities/User/type/userType';

type InitStateUser = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  // tasks: Task[];
  // setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const initState: InitStateUser = {
  user: undefined,
  setUser: () => {},
  // tasks: [],
  // setTasks: () => {},
};

export const AppContext = createContext(initState);
