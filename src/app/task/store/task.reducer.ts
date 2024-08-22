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
      console.log('NO ESTA LLEGANOD', id, putTask);

      return {
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...putTask } : task
        ),
      };
    })
  ),
  extraSelectors: ({ selectTasks }) => ({
    selectCompletedTasks: createSelector(selectTasks, (tasks) =>
      tasks.filter((task) => task.completed).reverse()
    ),
    selectUncompletedTasks: createSelector(selectTasks, (tasks) =>
      tasks.filter((task) => !task.completed).reverse()
    ),
  }),
});

export const { selectTasks, selectCompletedTasks, selectUncompletedTasks } =
  taskFeature;
