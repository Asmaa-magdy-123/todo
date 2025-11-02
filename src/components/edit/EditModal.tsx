import { useState, useEffect } from "react";
import type { Task } from "../../types";

interface EditTaskFormProps {
  task: Task | null;
  onSave: (updatedTask: Task) => void;
}

export default function EditTaskForm({ task, onSave }: EditTaskFormProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(task);
  const [error, setError] = useState(false);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!editedTask) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedTask.title && editedTask.priority && editedTask.desc) {
      onSave(editedTask);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl max-w-full space-y-4"
    >
      <h2 className="text-xl font-semibold border-b-2 pb-2 border-gray-200 text-center">
        Edit Task
      </h2>


      {/* Title */}
      <div className="flex flex-col">
        <label htmlFor="title" className="text-gray-600 font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={editedTask.title || ""}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
          placeholder="Edit task title"
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
          value={editedTask.priority || ""}
          onChange={(e) =>
            setEditedTask({ ...editedTask, priority: e.target.value })
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
          value={editedTask.desc || ""}
          onChange={(e) =>
            setEditedTask({ ...editedTask, desc: e.target.value })
          }
          placeholder="Edit task description..."
          rows={3}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm">Please fill all fields.</p>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
