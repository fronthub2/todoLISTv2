import { inject, Injectable } from '@angular/core';
import { ITask, keyInLocalStorage } from '../interface/task.interface';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class taskService {
  private LocalStorageService = inject(LocalstorageService);
  private tasks: ITask[] = [];
  private key: string = keyInLocalStorage;

  constructor() {
    this.tasks = this.LocalStorageService.getLocalStorage(this.key) || [];
  }

  getData() {
    return this.tasks;
  }

  addData(task: ITask) {
    this.tasks.push(task);
  }

  deleteData(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  saveInLocalStorage(key: string) {
    this.LocalStorageService.setLocalStorage(key, this.tasks);
  }

  getDataByIndex(index: number) {
    return this.tasks[index];
  }

  getDataById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
}
