import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../interface/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskHttpService {
  private http = inject(HttpClient);
  private baseUrl: string = '';
  taskHttp!: Observable<ITask[]>;

  constructor() {}

  getTaskHttp(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.baseUrl}/...`);
  }

  addTaskHttp(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${this.baseUrl}/...`, task);
  }

  updateTaskHttp(task: ITask, id: string): Observable<ITask> {
    return this.http.put<ITask>(`${this.baseUrl}/.../${id}`, task);
  }

  deleteTaskHttp(id: string): Observable<ITask> {
    return this.http.delete<ITask>(`${this.baseUrl}/.../${id}`);
  }
}
