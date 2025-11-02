import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task, newTaskType } from "../types";
import toast from "react-hot-toast";

interface TasksState {
  data: Task[];
}

const initialState: TasksState = {
  data: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.data = action.payload;
    },
    addTask: (state, action: PayloadAction<newTaskType>) => {
      const newTask = { ...action.payload, id: state.data.length + 1 };
      state.data.push(newTask as Task);
      toast.success(`Added task successfully:`);

    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((t) => t.id !== action.payload);
      toast.error(`Deleted task:`);
    },
    completeTask: (state, action: PayloadAction<number>) => {
      const task = state.data.find((t) => t.id === action.payload);
      if (task) task.completed = true;
      toast.success(`Complete a task:`);

    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.data.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
      toast.success(`Edit a task successfully:`);


      
    },
  },
});

export const { setTasks, addTask, deleteTask, completeTask, editTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
