import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import {
  ITask,
  keyInLocalStorage,
  TStatus,
} from '../../interface/task.interface';
import { taskService } from '../../services/task.service';

@Component({
  selector: 'app-backlog-settings',
  imports: [TitleCasePipe, FormsModule, MatTooltipModule],
  templateUrl: './backlog-settings.component.html',
  styleUrl: './backlog-settings.component.scss',
})
export class BacklogSettingsComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  matDialog = inject(MatDialog);
  tasksService = inject(taskService);

  task!: ITask;
  idURL!: string;
  valueSelect: string = 'Paused';
  keyInLocalStorage: string = keyInLocalStorage;
  task$!: BehaviorSubject<ITask>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idURL = params.get('id') as string;
      this.task = this.tasksService.getDataById(this.idURL) as ITask;
      this.task$ = new BehaviorSubject(this.task);
      this.valueSelect = this.task$.value.status as string;
    });
  }

  onChangeSelect() {
    this.task$
      .pipe(map((t) => (t.status = this.valueSelect as TStatus)))
      .subscribe();
    this.tasksService.saveInLocalStorage(this.keyInLocalStorage);
    console.log(this.task);
  }

  onDeleteTask(id: string) {
    this.tasksService.deleteData(id);
    this.tasksService.saveInLocalStorage(this.keyInLocalStorage);
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }

  onEditTask(id: string) {
  }
}
