export type TStatus = 'In progress' | 'Completed' | 'Paused';

export interface ITask {
  id: string;
  text: string;
  description: string | null;
  status: TStatus;
}

export const keyInLocalStorage: string = 'tasks';
