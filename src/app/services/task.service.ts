import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { TaskActions } from '../task/store/task.actions';
import { Task } from '../task/store/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient, private store: Store) {}

  getTask() {
    return this.http
      .get<Task[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        map((tasks) =>
          tasks.map((task) => ({
            ...task,
            id: crypto.randomUUID(),
            priority: Math.floor(Math.random() * 50),
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
