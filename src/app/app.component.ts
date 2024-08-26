import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { AddBtnComponent } from './button/add-btn/add-btn.component';
import { TaskService } from './services/task.service';
import { ThemeService } from './services/theme.service';
import { TaskActions } from './task/store/task.actions';
import { Task } from './task/store/task.model';
import {
  selectCompletedTasks,
  selectUncompletedTasks,
} from './task/store/task.reducer';
import { TaskList } from './task/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    NzMessageModule,
    NzIconModule,
    NzInputModule,
    TaskList,
    ReactiveFormsModule,
    AddBtnComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  completedTasks$;
  uncompletedTasks$;

  taskForm = new FormGroup({
    task: new FormControl(''),
    completed: new FormControl(false),
  });

  themeService = inject(ThemeService);

  constructor(
    private taskService: TaskService,
    private store: Store,
    private message: NzMessageService
  ) {
    this.taskService.getTask().subscribe((data) => {
      this.store.dispatch(TaskActions.retrieve({ tasks: data }));
    });

    this.completedTasks$ = this.store.select(selectCompletedTasks);
    this.uncompletedTasks$ = this.store.select(selectUncompletedTasks);
  }

  onRemove(id: string) {
    this.taskService.removeTask(id);

    this.message.success('Task Deleted', {
      nzPauseOnHover: true,
    });
  }

  onEdit(task: Task) {
    this.taskService.editTaskCompleted(task);
  }

  onSubmit() {
    if (!this.taskForm.value.task) {
      this.message.error('You need put a good task');
      return;
    }

    this.taskService.addTask({
      title: this.taskForm.controls.task.value ?? '',
      completed: this.taskForm.controls.completed.value ?? false,
      id: crypto.randomUUID(),
      userId: 1,
    });

    this.message.success('Task Added', {
      nzPauseOnHover: true,
    });

    this.taskForm.reset();
  }
}
