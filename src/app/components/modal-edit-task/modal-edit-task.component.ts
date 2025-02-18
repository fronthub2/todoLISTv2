import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../../interface/task.interface';
import { taskService } from '../../services/task.service';

@Component({
  selector: 'app-modal-edit-task',
  imports: [FormsModule, MatDialogModule, NgClass],
  templateUrl: './modal-edit-task.component.html',
  styleUrl: './modal-edit-task.component.scss',
})
export class ModalEditTaskComponent implements OnInit {
  @Input() task$!: BehaviorSubject<ITask>;
  @Output() isShowModalEditTask = new EventEmitter<boolean>();
  private taskService = inject(taskService);
  text!: string;
  description!: string | null;

  ngOnInit(): void {
    const task = this.task$.value;
    this.text = task.text;
    this.description = task.description;
  }

  onEditTask() {
    const task = this.task$.value;
    if (!this.getValid()) {
      task.text = this.text;
      task.description = this.description;
      this.onCloseModal();
      this.taskService.saveInLocalStorage('tasks');
    } else {
      return;
    }
  }

  getValid() {
    return this.text.trim().length !== 0 ? false : true;
  }

  onCloseModal() {
    this.isShowModalEditTask.emit(false);
  }
}
