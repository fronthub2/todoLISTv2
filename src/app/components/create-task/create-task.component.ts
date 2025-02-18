import { Component, DoCheck, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ITask, keyInLocalStorage } from '../../interface/task.interface';
import { SecureIDService } from '../../services/secure-id.service';
import { taskService } from '../../services/task.service';
import { minLength } from './create-task.validators';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements DoCheck {
  private secureIDService = inject(SecureIDService);
  private tasksService = inject(taskService);

  text!: string;
  description!: string;
  keyInLocalStorage: string = keyInLocalStorage;
  labelTextInput: string = 'Write text';
  labelTextTextarea: string = 'Write description';
  titleTooltip: 'Добавить' | 'Нельзя добавить' = 'Нельзя добавить';

  ngDoCheck() {
    this.sendTitleTooltip();
  }

  form = new FormGroup({
    text: new FormControl(this.text, [
      Validators.required,
      minLength(),
      Validators.maxLength(20),
    ]),
    description: new FormControl(this.description),
    status: new FormControl('Paused'),
  });

  get formValue(): ITask {
    return {
      id: this.secureIDService.getSecureID(),
      text: this.form.controls['text'].value as string,
      description: this.form.controls['description'].value,
      status: 'Paused',
    };
  }

  onAddTask() {
    this.tasksService.addData(this.formValue);
    console.log(this.tasksService.getData());
    this.tasksService.saveInLocalStorage(this.keyInLocalStorage);
    this.form.reset();
  }

  sendTitleTooltip() {
    this.form.invalid
      ? (this.titleTooltip = 'Нельзя добавить')
      : (this.titleTooltip = 'Добавить');
  }
}
