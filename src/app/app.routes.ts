import { Routes } from '@angular/router';
import { BacklogSettingsComponent } from './components/backlog-settings/backlog-settings.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { BoardComponent } from './components/board/board.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ModalEditTaskComponent } from './components/modal-edit-task/modal-edit-task.component';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/board',
  },
  {
    path: 'backlog',
    component: BacklogComponent,
    children: [
      {
        path: ':id',
        component: BacklogSettingsComponent,
        children: [
          {
            path: 'modal-edit-task',
            component: ModalEditTaskComponent,
            outlet: 'modal',
          },
        ],
      },
    ],
  },
  {
    path: 'board',
    component: BoardComponent,
    children: [
      {
        path: 'board-task',
        redirectTo: 'backlog/:id',
      },
    ],
  },
  {
    path: 'createTask',
    component: CreateTaskComponent,
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
