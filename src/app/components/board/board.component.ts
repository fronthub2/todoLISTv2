import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ITask } from '../../interface/task.interface';
import { taskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-board',
  imports: [TaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit, OnDestroy {
  private taskService = inject(taskService);
  tasks$!: Observable<ITask[]>;
  subscriptions: Subscription = new Subscription();

  tasks!: ITask[];
  tasks_paused!: ITask[];
  tasks_progress!: ITask[];
  tasks_completed!: ITask[];

  ngOnInit(): void {
    this.tasks$ = this.taskService.getData();
    this.subscriptions.add(
      this.tasks$.subscribe((taskAll) => {
        this.tasks = taskAll;

        this.tasks_paused = this.tasks.filter(
          (task) => task.status === 'Paused'
        );
        this.tasks_progress = this.tasks.filter(
          (task) => task.status === 'In progress'
        );
        this.tasks_completed = this.tasks.filter(
          (task) => task.status === 'Completed'
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('отписка in board');
  }
}
