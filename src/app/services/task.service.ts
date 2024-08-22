import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Task } from '../task/store/task.model';
import { TaskActions } from '../task/store/task.actions';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient, private store: Store) {}

  getTask() {
    return this.http
      .get<Task[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        map((tasks) =>
          tasks.splice(0, 20).map((task) => ({
            ...task,
            id: crypto.randomUUID(),
          }))
        )
      );
  }

  addTask(newTask: Task) {
    this.store.dispatch(
      TaskActions.add({
        newTask,
      })
    );
  }

  removeTask(id: string) {
    this.store.dispatch(TaskActions.remove({ id }));
  }

  editTaskCompleted(updatedTask: Task) {
    this.store.dispatch(
      TaskActions.edit({
        id: updatedTask.id,
        putTask: { completed: !updatedTask.completed },
      })
    );
  }

  editTaskTitle(id: string, title: string) {
    this.store.dispatch(
      TaskActions.edit({
        id,
        putTask: {
          title,
        },
      })
    );
  }
}
