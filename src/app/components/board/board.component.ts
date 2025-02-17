import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ITask } from '../../interface/task.interface';
import { taskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-board',
  imports: [TaskComponent, AsyncPipe],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  taskService = inject(taskService);
  tasks$!: BehaviorSubject<ITask[]>;
  tasks!: ITask[];
  tasks_paused!: ITask[];
  tasks_progress!: ITask[];
  tasks_completed!: ITask[];

  ngOnInit(): void {
    const tasks = this.taskService.getData();
    this.tasks$ = new BehaviorSubject(tasks);

    this.tasks$
      .pipe(
        map((tasks) => tasks.filter((task) => task.status === 'In progress')),
        tap((value) => {
          this.tasks_progress = value;
          console.log('value2', value);
          console.log('tasks_paused', this.tasks_progress);
        })
      )
      .subscribe();
    this.tasks$
      .pipe(
        map((tasks) => tasks.filter((task) => task.status === 'Completed')),
        tap((value) => {
          this.tasks_completed = value;
          console.log('value2', value);
          console.log('tasks_completed', this.tasks_completed);
        })
      )
      .subscribe();

    this.tasks = this.taskService.getData();
  }
}
