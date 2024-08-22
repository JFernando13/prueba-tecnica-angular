import { createActionGroup, props } from '@ngrx/store';
import { Task } from './task.model';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    add: props<{ newTask: Task }>(),
    remove: props<{ id: string }>(),
    edit: props<{ id: string; putTask: Partial<Task> }>(),
    retrieve: props<{ tasks: Task[] }>(),
  },
});
