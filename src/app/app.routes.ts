import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/board',
  },
  {
    path: 'backlog',
    title: 'Backlog',
    loadComponent: () =>
      import('./components/backlog/backlog.component').then(
        (mod) => mod.BacklogComponent
      ),
    children: [
      {
        path: ':id',
        title: 'Backlog settings',
        loadComponent: () =>
          import(
            './components/backlog-settings/backlog-settings.component'
          ).then((mod) => mod.BacklogSettingsComponent),
        children: [
          {
            path: 'modal-edit-task',
            loadComponent: () =>
              import(
                './components/modal-edit-task/modal-edit-task.component'
              ).then((mod) => mod.ModalEditTaskComponent),
            outlet: 'modal',
          },
        ],
      },
    ],
  },
  {
    path: 'board',
    title: 'Board',
    loadComponent: () =>
      import('./components/board/board.component').then(
        (mod) => mod.BoardComponent
      ),
    children: [
      {
        path: 'board-task',
        redirectTo: 'backlog/:id',
      },
    ],
  },
  {
    path: 'createTask',
    title: 'Create task',
    loadComponent: () =>
      import('./components/create-task/create-task.component').then(
        (mod) => mod.CreateTaskComponent
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./shared/not-found-page/not-found-page.component').then(
        (mod) => mod.NotFoundPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
