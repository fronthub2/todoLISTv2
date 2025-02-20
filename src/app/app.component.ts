import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  titleServiceBrowser = inject(Title);
  title: string = '';

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.routerState.root;
        const title = this.getTitle(currentRoute);
        this.titleServiceBrowser.setTitle(title);
      });
  }

  private getTitle(route: ActivatedRoute): string {
    while (route.firstChild) {
      route = route.firstChild;
      if (route.snapshot.data['title']) {
        this.title = route.snapshot.data['title'];
      }
    }
    return this.title;
  }
}
