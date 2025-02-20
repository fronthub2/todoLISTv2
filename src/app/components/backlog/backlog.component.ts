import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Observable, Subject, Subscription, tap } from 'rxjs';
import { ITask } from '../../interface/task.interface';
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
  selectedId$: Subject<string> = new Subject<string>();
  subscriptions: Subscription = new Subscription();

  tasks!: ITask[];
  selectedId: string[] = [];
  isShowCheckbox: boolean = false;
  isShowCheckIcon: boolean = false;

  ngOnInit(): void {
    this.tasks$ = this.tasksService.getData();
    this.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.subscriptions.add(
      this.checkboxToggle$
        .pipe(
          tap(() => {
            this.isShowCheckbox = !this.isShowCheckbox;
            this.isShowCheckIcon =
              this.isShowCheckbox && this.selectedId.length > 0;
          })
        )
        .subscribe()
    );

    this.subscriptions.add(
      this.selectedId$
        .pipe(
          tap((id) => {
            this.isShowCheckIcon = true;
            if (this.selectedId.includes(id)) {
              this.selectedId = this.selectedId.filter((ID) => ID !== id);
            } else {
              this.selectedId.push(id);
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onEnableLitter() {
    this.checkboxToggle$.next();
  }

  onSendSelectedById(id: string) {
    this.selectedId$.next(id);
  }

  onDeleteByCheckIcon() {
    this.selectedId.forEach((id) => this.tasksService.deleteData(id));
    this.selectedId = [];
    this.checkboxToggle$.next();

    this.router.navigate(['/backlog'], {
      relativeTo: this.route,
    });
  }
}
