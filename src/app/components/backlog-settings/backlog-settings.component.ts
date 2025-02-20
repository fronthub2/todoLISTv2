import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import {
  ITask,
  keyInLocalStorage,
  TStatus,
} from '../../interface/task.interface';
import { taskService } from '../../services/task.service';
import { ModalEditTaskComponent } from '../modal-edit-task/modal-edit-task.component';

@Component({
  selector: 'app-backlog-settings',
  imports: [
    TitleCasePipe,
    FormsModule,
    MatTooltipModule,
    ModalEditTaskComponent,
    RouterLink,
  ],
  templateUrl: './backlog-settings.component.html',
  styleUrl: './backlog-settings.component.scss',
})
export class BacklogSettingsComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  tasksService = inject(taskService);

  tasksSubject!: BehaviorSubject<ITask>;
  idURL!: string;
  valueSelect: string = 'Paused';
  keyInLocalStorage: string = keyInLocalStorage;
  isShowModalEditTask: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idURL = params.get('id') as string;
      const task = this.tasksService.getDataById(this.idURL) as ITask;
      this.tasksSubject = new BehaviorSubject(task);
      this.valueSelect = this.tasksSubject.value.status as string;
    });
  }

  onChangeSelect() {
    this.tasksSubject
      .pipe(map((t) => (t.status = this.valueSelect as TStatus)))
      .subscribe();
    this.tasksService.saveInLocalStorage(this.keyInLocalStorage);
    console.log(this.tasksSubject.value);
  }

  onDeleteTask(id: string) {
    this.tasksService.deleteData(id);
    this.tasksService.saveInLocalStorage(this.keyInLocalStorage);
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }

  onEditTask() {
    this.isShowModalEditTask = true;
  }

  onShowModalEditTask(value: boolean) {
    this.isShowModalEditTask = value;
  }
}
