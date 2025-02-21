import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, map, Subscription } from 'rxjs';
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
export class BacklogSettingsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tasksService = inject(taskService);

  task!: ITask;
  taskSubject: BehaviorSubject<ITask> = new BehaviorSubject(this.task);
  subscriptions: Subscription = new Subscription(); // поток данных, который позволит управлять подписками.
  
  valueSelect: string = 'Paused';
  keyInLocalStorage: string = keyInLocalStorage;
  isShowModalEditTask: boolean = false;

  ngOnInit(): void {
    this.subscriptions.add( // добавляем в поток
      this.route.paramMap.subscribe((params) => { // подписываемся
        const id  = params.get('id') as string; // получаем id
        this.task = this.tasksService.getDataById(id) as ITask;
        this.valueSelect = this.task.status;
        this.taskSubject.next(this.task); // уведомляем поток
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // отписываемся от всех подписчиков
    console.log('отписка in backlog-setting');
  }

  onChangeSelect() {
    this.subscriptions.add(
      this.taskSubject
        .pipe(map((t) => (t.status = this.valueSelect as TStatus))) // изменяем статус
        .subscribe()
    );
    this.tasksService.saveInLocalStorage(this.keyInLocalStorage);
    console.log(this.taskSubject.value);
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
