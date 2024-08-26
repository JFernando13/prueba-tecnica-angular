import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { TaskActions } from './task.actions';
import { Task } from './task.model';

interface State {
  tasks: Task[];
}

const initialState: State = {
  tasks: [],
};

export const taskFeature = createFeature({
  name: 'task',
  reducer: createReducer(
    initialState,
    on(TaskActions.add, (state, { newTask }) => {
      if (state.tasks.some((task) => task.id === newTask.id)) return state;

      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }),
    on(TaskActions.retrieve, (_state, { tasks }) => {
      return {
        tasks,
      };
    }),
    on(TaskActions.remove, (state, { id }) => {
      return {
        ...state.tasks,
        tasks: state.tasks.filter((task) => task.id !== id),
      };
    }),
    on(TaskActions.edit, (state, { id, putTask }) => {
      return {
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...putTask } : task
        ),
      };
    })
  ),
  extraSelectors: ({ selectTasks }) => ({
    selectCompletedTasks: (userId?: number) =>
      createSelector(selectTasks, (tasks) => {
        if (userId) {
          return tasks
            .filter((task) => task.userId === userId && task.completed)
            .reverse();
        }

        return tasks.filter((task) => task.completed).reverse();
      }),
    selectUncompletedTasks: (userId?: number) =>
      createSelector(selectTasks, (tasks) => {
        if (userId) {
          return tasks
            .filter((task) => task.userId === userId && !task.completed)
            .reverse();
        }

        return tasks.filter((task) => !task.completed).reverse();
      }),
    selectUsers: createSelector(selectTasks, (tasks) => {
      const users = tasks.map((task) => task.userId);
      return Array.from(new Set(users));
    }),
  }),
});

export const {
  selectTasks,
  selectCompletedTasks,
  selectUncompletedTasks,
  selectUsers,
} = taskFeature;
