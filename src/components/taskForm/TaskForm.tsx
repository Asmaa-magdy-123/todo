import { useState } from "react";
import type { newTaskType } from "../../types";
import { Toaster } from "react-hot-toast";

interface TaskFormProps {
  newTask: newTaskType;
  setNewTask: (task: newTaskType) => void;
  onSubmit: (task: newTaskType) => void;
}

export default function TaskForm({
  newTask,
  setNewTask,
  onSubmit,
}: TaskFormProps) {
  const[error, setError]= useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.date && newTask.desc && newTask.priority && newTask.title) {
      onSubmit(newTask);
      setError(false);

    } else {
      setError(true);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className=" rounded-2xl  max-w-full space-y-4"
      >
        <h2 className="text-xl font-semibold border-b-2 pb-2 border-gray-200  text-center">
          Add New Task
        </h2>

        {/* Date */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-gray-600 font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            onChange={(e) =>
              setNewTask({ ...newTask, date: new Date(e.target.value) })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-600 font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={newTask.title || ""}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Enter task title"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label htmlFor="priority" className="text-gray-600 font-medium mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={newTask.priority || ""}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="desc" className="text-gray-600 font-medium mb-1">
            Description
          </label>
          <textarea
            id="desc"
            value={newTask.desc || ""}
            onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
            placeholder="Enter task description..."
            rows={3}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
          />
        </div>

        {error && <p className="text-red-600 text-sm "> Please fill all fields. </p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Save Task
        </button>
      </form>
    </>
  );
}
