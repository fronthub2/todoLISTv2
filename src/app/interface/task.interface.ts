export type TStatus = 'In progress' | 'Completed' | 'Paused';
export const keyInLocalStorage: string = 'tasks';

export interface ITask {
  id: string;
  text: string;
  description: string | null;
  status: TStatus;
}
