import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  imports: [RouterLink, TitleCasePipe, MatTooltipModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() title!: string;
  @Input() count!: number;
  @Input() id!: string;
  @Input() titleTooltip: string = '';
}
