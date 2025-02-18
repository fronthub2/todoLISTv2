import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../../interface/task.interface';
import { taskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-board',
  imports: [TaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  private taskService = inject(taskService);
  tasks$: Observable<ITask[]> = this.taskService.getData();
  tasks!: ITask[];
  tasks_paused!: ITask[];
  tasks_progress!: ITask[];
  tasks_completed!: ITask[];

  ngOnInit(): void {
    this.tasks$.subscribe((taskAll) => {
      this.tasks = taskAll;

      this.tasks_paused = this.tasks.filter((task) => task.status === 'Paused');
      this.tasks_progress = this.tasks.filter(
        (task) => task.status === 'In progress'
      );
      this.tasks_completed = this.tasks.filter(
        (task) => task.status === 'Completed'
      );
    });
  }
}
