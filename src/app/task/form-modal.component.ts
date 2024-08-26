import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AddBtnComponent } from '../button/add-btn/add-btn.component';
import { TaskService } from '../services/task.service';
import { Task } from './store/task.model';

@Component({
  standalone: true,
  selector: 'modal-component',
  imports: [
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzIconModule,
    AddBtnComponent,
  ],
  template: `
    <button nz-button nzType="primary" nzGhost (click)="showModal($event)">
      <span nz-icon nzType="edit" nzTheme="outline"></span>
    </button>
    <nz-modal
      [(nzVisible)]="isVisible"
      [nzTitle]="modalTitle"
      [nzContent]="modalContent"
      [nzFooter]="null"
      (nzOnCancel)="handleCancel()"
    >
      <ng-template #modalTitle>
        <h2>Edit Task</h2>
      </ng-template>

      <ng-template #modalContent>
        <form
          class="flex gap-3 w-full"
          [formGroup]="editTaskForm"
          (ngSubmit)="onSubmit()"
        >
          <input
            type="text"
            nz-input
            class="rounded-md px-2 flex-1"
            placeholder="Edit your task"
            formControlName="editTask"
          />
          <add-btn />
        </form>
      </ng-template>
    </nz-modal>
  `,
})
export class FormModalComponent {
  isVisible = false;
  isConfirmLoading = false;

  constructor(
    private store: Store,
    private message: NzMessageService,
    private taskService: TaskService
  ) {}

  @Input({ required: true })
  task: Task = {} as Task;

  editTaskForm = new FormGroup({
    editTask: new FormControl('', Validators.required),
    editCompleted: new FormControl(false),
  });

  showModal(e: Event) {
    e.stopPropagation();
    this.isVisible = true;

    if (this.task) {
      this.editTaskForm.patchValue({
        editTask: this.task.title,
        editCompleted: this.task.completed,
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onSubmit() {
    if (this.task) {
      this.taskService.editTaskTitle(
        this.task.id,
        this.editTaskForm.value.editTask ?? ''
      );

      this.isVisible = false;
      this.message.success('Task Edited');
    }
  }
}
