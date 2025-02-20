import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITask, keyInLocalStorage } from '../interface/task.interface';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class taskService {
  private LocalStorageService = inject(LocalstorageService);
  private tasksSubject: BehaviorSubject<ITask[]>;
  private key: string = keyInLocalStorage;

  constructor() {
    const tasksLocalStorage =
      this.LocalStorageService.getLocalStorage(this.key) || [];
    this.tasksSubject = new BehaviorSubject<ITask[]>(tasksLocalStorage);
  }

  getData(): Observable<ITask[]> {
    return this.tasksSubject.asObservable();
  }

  get taskAll(): Observable<ITask[]> {
    return this.tasksSubject.asObservable();
  }

  addData(task: ITask): void {
    const currentTasks = this.tasksSubject.value;
    currentTasks.push(task);
    this.tasksSubject.next(currentTasks);
  }

  set addTask(task: ITask) {
    const currentTasks = this.tasksSubject.value;
    currentTasks.push(task);
    this.tasksSubject.next(currentTasks);
  }

  deleteData(id: string): void {
    const currentTasks = this.tasksSubject.value;
    const filtered = currentTasks.filter((task) => task.id !== id);
    this.tasksSubject.next(filtered);
  }

  saveInLocalStorage(key: string): void {
    this.LocalStorageService.setLocalStorage(key, this.tasksSubject.value);
  }

  getDataByIndex(index: number): ITask {
    const currentTasks = this.tasksSubject.value;
    return currentTasks[index];
  }

  getDataById(id: string): ITask | undefined {
    const currentTasks = this.tasksSubject.value;
    return currentTasks.find((task) => task.id === id);
  }
}
