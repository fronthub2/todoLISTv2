import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Observable, Subject, Subscription, tap } from 'rxjs';
import { ITask, keyInLocalStorage } from '../../interface/task.interface';
import { taskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-backlog',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    TaskComponent,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss',
})
export class BacklogComponent implements OnInit, OnDestroy {
  private tasksService = inject(taskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  tasks$!: Observable<ITask[]>;
  checkboxToggle$ = new Subject<void>();
  litterToogle$ = new Subject<void>();
  selectedId$: Subject<string> = new Subject<string>();
  subscriptions: Subscription = new Subscription();

  tasks!: ITask[];
  selectedId: string[] = [];
  isShowCheckbox: boolean = false;
  isShowLitterIcon: boolean = false;
  titleCheckTooltip: 'Открыть выделение' | 'Закрыть выделение' =
    'Открыть выделение';
  keyInLocalStorage: string = keyInLocalStorage;

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getData();

    this.subscriptions.add(
      this.tasks$.subscribe((tasks) => {
        this.tasks = tasks;
      })
    );

    this.subscriptions.add(
      this.litterToogle$
        .pipe(
          tap(() => {
            this.isShowLitterIcon =
              this.isShowCheckbox && this.selectedId.length > 0;
          })
        )
        .subscribe()
    );

    this.subscriptions.add(
      this.checkboxToggle$
        .pipe(
          tap(() => {
            this.isShowCheckbox = !this.isShowCheckbox;
            this.isShowCheckbox
              ? (this.titleCheckTooltip = 'Закрыть выделение')
              : (this.titleCheckTooltip = 'Открыть выделение');
            this.litterToogle$.next();
          })
        )
        .subscribe()
    );

    this.subscriptions.add(
      this.selectedId$
        .pipe(
          tap((id) => {
            this.isShowLitterIcon = true;
            if (this.selectedId.includes(id)) {
              this.selectedId = this.selectedId.filter((ID) => ID !== id);
            } else {
              this.selectedId.push(id);
            }
            this.litterToogle$.next();
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('отписка in backlog');
  }

  onCheckActivation() {
    this.checkboxToggle$.next();
  }

  onSendSelectedById(id: string) {
    this.selectedId$.next(id);
  }

  onDeleteByLitter() {
    this.selectedId.forEach((id) => this.tasksService.deleteData(id));
    this.selectedId = [];
    this.checkboxToggle$.next();
    this.tasksService.saveInLocalStorage(this.keyInLocalStorage);

    this.router.navigate(['/backlog'], {
      relativeTo: this.route,
    });
  }
}
