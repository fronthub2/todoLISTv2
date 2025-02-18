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
import { ITask } from '../../interface/task.interface';
import { taskService } from '../../services/task.service';

@Component({
  selector: 'app-modal-edit-task',
  imports: [FormsModule, MatDialogModule, NgClass],
  templateUrl: './modal-edit-task.component.html',
  styleUrl: './modal-edit-task.component.scss',
})
export class ModalEditTaskComponent implements OnInit {
  @Input() task!: ITask;
  @Output() isShowModalEditTask = new EventEmitter<boolean>();
  taskService = inject(taskService);
  text!: string;
  description!: string | null;

  ngOnInit(): void {
    this.text = this.task.text;
    this.description = this.task.description;
  }

  onEditTask() {
    if (!this.getValid()) {
      this.task.text = this.text;
      this.task.description = this.description;
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
