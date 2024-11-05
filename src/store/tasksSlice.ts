import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EStatusType, TaskType } from "../Types";

const getInitial = (): TaskType[] => {
  const tasksFromStorage = localStorage.getItem("tasks");
  return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
};

const initialState: TaskType[] = getInitial();

const updateLocalStorage = (tasks: TaskType[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskStore(state, action: PayloadAction<string>) {
      const newTask: TaskType = {
        id: Date.now(),
        text: action.payload,
        status: EStatusType.active,
      };
      state.push(newTask);
      updateLocalStorage(state);
    },

    clearTasksStore(state) {
      localStorage.removeItem("tasks");
      state.length = 0;
    },

    changeTaskStatusOnCompleted(state, action: PayloadAction<{ id: number }>) {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = EStatusType.completed;
      }
      updateLocalStorage(state);
    },

    changeTaskStatusOnDeleted(state, action: PayloadAction<{ id: number }>) {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = EStatusType.deleted;
      }
      updateLocalStorage(state);
    },
  },
});

export const {
  addTaskStore,
  clearTasksStore,
  changeTaskStatusOnCompleted,
  changeTaskStatusOnDeleted,
} = tasksSlice.actions;
export default tasksSlice.reducer;
