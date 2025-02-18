import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITask, keyInLocalStorage } from '../interface/task.interface';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class taskService {
  private LocalStorageService = inject(LocalstorageService);
  private tasks$: BehaviorSubject<ITask[]>;
  private key: string = keyInLocalStorage;

  constructor() {
    const tasksLocalStorage =
      this.LocalStorageService.getLocalStorage(this.key) || [];
    this.tasks$ = new BehaviorSubject<ITask[]>(tasksLocalStorage);
  }

  getData(): Observable<ITask[]> {
    return this.tasks$.asObservable();
  }

  addData(task: ITask): void {
    const currentTasks = this.tasks$.value;
    currentTasks.push(task);
    this.tasks$.next(currentTasks);
  }

  deleteData(id: string): void {
    const currentTasks = this.tasks$.value;
    const filtered = currentTasks.filter((task) => task.id !== id);
    this.tasks$.next(filtered);
  }

  saveInLocalStorage(key: string): void {
    this.LocalStorageService.setLocalStorage(key, this.tasks$.value);
  }

  getDataByIndex(index: number): ITask {
    const currentTasks = this.tasks$.value;
    return currentTasks[index];
  }

  getDataById(id: string): ITask | undefined {
    const currentTasks = this.tasks$.value;
    return currentTasks.find((task) => task.id === id);
  }
}
