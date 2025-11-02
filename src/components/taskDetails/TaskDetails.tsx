import type { Task } from "../../types";
import Modal from "../Modal";

interface TaskDetailsModalProps {
  task: Task;
  theme:string;
  onClose: () => void;
}

export default function TaskDetailsModal({
  task,
  theme,
  onClose,
}: TaskDetailsModalProps) {
  return (
    <Modal onClose={onClose} theme={theme}>
      <div className="p-4  m-auto">
        <h2 className="text-xl font-semibold mb-5 text-center border-b border-gray-200 pb-2">
          Task Details
        </h2>

        <div className="space-y-1 sm:space-y-3 text-md">
          <div className="flex flex-col md:flex-row justify-between w-full  md:items-center">
            <div className="flex mb-1  gap-2">
              <span className="text-gray-500">Title:</span>
              <span className="font-medium text-black">{task.title}</span>
            </div>

            <div className="flex mb-1 gap-2">
              <span className="text-gray-500">Date:</span>
              <span>
                {task.date
                  ? new Date(task.date).toLocaleDateString()
                  : "1/1/2026"}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row  justify-between w-full md:items-center">
            <div className="flex mb-1 items-center gap-2">
              <span className="text-gray-500">Priority:</span>
              <span
                className={` py-1 rounded-md font-semibold ${
                  task.priority === "high"
                    ? "text-red-500"
                    : task.priority === "medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {task.priority || "Low"}
              </span>
            </div>

            <div className="flex mb-1 gap-2">
              <span className="text-gray-500">Status:</span>
              <span
                className={`${
                  task.completed ? "text-green-600" : "text-red-500"
                } font-semibold`}
              >
                {task.completed ? "Completed" : "Not Completed"}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <span className="block mb-1 text-gray-500">Description:</span>
            <p className="text-gray-700 text-sm border p-2 rounded-md bg-gray-50">
              {task.desc ? task.desc : "No description added"}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-7 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
