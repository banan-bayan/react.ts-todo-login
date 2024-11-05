import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EStatusType, TaskType } from "../Types";

const getInitial = () => {
  const tasksFromStorage = localStorage.getItem("tasks");

  return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
};

const initialState = getInitial();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskStore(state, actions: PayloadAction<string>) {
      const newTask: TaskType = {
        id: Date.now(),
        text: actions.payload,
        status: EStatusType.active,
      };

      state.push(newTask);

      localStorage.setItem("tasks", JSON.stringify(state));
    },

    clearTasksStore(state) {
      localStorage.removeItem("tasks");
      state.length = 0;
    },

    changeTaskStatusOnCompleted(state, action: PayloadAction<{ id: number }>) {
      const task = state.find((task: TaskType) => task.id === action.payload.id);
      if (task) {
        task.status = EStatusType.completed;
      }
      localStorage.setItem("tasks", JSON.stringify(state));

    },

    changeTaskStatusOnDeleted(state, action: PayloadAction<{ id: number }>) {
      const task = state.find((task: TaskType) => task.id === action.payload.id);
      if (task) {
        task.status = EStatusType.deleted;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    
  },
});

export const { addTaskStore, clearTasksStore, changeTaskStatusOnCompleted, changeTaskStatusOnDeleted } = tasksSlice.actions;
export default tasksSlice.reducer;
