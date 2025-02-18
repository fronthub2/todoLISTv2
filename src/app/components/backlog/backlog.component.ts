import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ITask } from '../../interface/task.interface';
import { taskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-backlog',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, TaskComponent],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss',
})
export class BacklogComponent implements OnInit {
  tasksService = inject(taskService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  tasks$: Observable<ITask[]> = this.tasksService.getData();

  tasks!: ITask[];
  id!: string;

  ngOnInit(): void {
    this.tasks$.subscribe((task) => {
      this.tasks = task;
      console.log('this.tasks in backlog', this.tasks);
    });
  }
}
