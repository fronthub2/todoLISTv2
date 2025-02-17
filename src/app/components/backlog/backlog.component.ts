import { Component, DoCheck, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ITask } from '../../interface/task.interface';
import { taskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-backlog',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, TaskComponent],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss',
})
export class BacklogComponent implements OnInit, DoCheck {
  tasksService = inject(taskService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  tasks: ITask[] = [];
  id!: string;

  ngOnInit(): void {
    this.tasks = this.tasksService.getData();
    console.log('tasks', this.tasks);
  }

  ngDoCheck(): void {
    this.tasks = this.tasksService.getData();
  }

  // goById(id: string) {
  //   this.router.navigate([id], {
  //     relativeTo: this.route,
  //   });
  // }
}
