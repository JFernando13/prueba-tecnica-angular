import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormModalComponent } from './form-modal.component';
import { Task } from './store/task.model';

@Component({
  standalone: true,
  selector: 'task-list',
  imports: [NzButtonModule, NzIconModule, FormModalComponent],
  template: `
    <section class="grid gap-3">
      <div class="flex gap-2 items-center">
        <h2 class="text-lg font-semibold dark:text-white">{{ title }}</h2>
        <span
          class="p-1.5 rounded-lg bg-gray-700 dark:bg-gray-700 text-xs font-bold text-white"
          >{{ tasks.length }}</span
        >
      </div>
      <section class="grid gap-2 rounded-md">
        @for(task of tasks; track task.id) {

        <article
          class="bg-white rounded-lg px-4 py-3 gap-4 flex justify-between items-center cursor-pointer hover:scale-105 transition-all hover:border-gray-500 border-2 border-solid duration-300 dark:bg-gray-700 dark:border-gray-900"
          (click)="edit.emit(task)"
        >
          <hgroup class="flex flex-col-reverse ">
            <h2 class="first-letter:uppercase font-semibold dark:text-white">
              {{ task.title }}
            </h2>
            <p class="text-xs font-thin flex gap-1 items-center">
              <span>{{ task.completed ? 'Completed' : 'Uncompleted' }}</span>
              <span
                class="rounded-[100vh] h-2 w-2 block"
                [class]="{
                  'bg-green-500': task.completed,
                  'bg-red-500': !task.completed
                }"
              ></span>
            </p>
          </hgroup>
          <menu class="flex gap-2">
            <modal-component [task]="task" />
            <button
              nz-button
              nzDanger
              [nzType]="'primary'"
              class="rounded-md"
              (click)="remove.emit(task.id)"
            >
              <span nz-icon nzType="delete" nzTheme="outline"></span>
            </button>
          </menu>
        </article>
        } @empty {
        <p>You have no {{ title.toLocaleLowerCase() }} tasks</p>
        }
      </section>
    </section>
  `,
})
export class TaskList {
  @Input({ required: true })
  tasks: Task[] = [];

  @Input({ required: true })
  title: string = '';

  @Output()
  remove = new EventEmitter<string>();

  @Output()
  edit = new EventEmitter<Task>();
}
