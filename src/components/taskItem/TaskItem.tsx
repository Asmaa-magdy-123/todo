import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import type { Task } from "../../types";
import { useSortable } from "@dnd-kit/sortable";

interface TaskItemProps {
  id: number;
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
  theme: string;
}

export default function TaskItem({
  id,
  task,
  onView,
  onEdit,
  onDelete,
  onComplete,
  theme,
}: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={`flex items-center *:text-center justify-between p-2 mb-1 rounded shadow cursor-move transition-all ${
        theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-700"
      }`}
    >
      <span {...listeners} className="cursor-move px-2 hover:text-blue-700">
        ⣿
      </span>
      <span className="w-1/12">{task.id}</span>
      <span className="w-2/12 hidden sm:block">
        {task.date ? new Date(task.date).toLocaleDateString() : "1/1/2026"}
      </span>
      <span className="w-3/12">{task.title}</span>
      <span className="w-2/12 hidden text-center sm:block">
        {task.priority || "low"}
      </span>
      <span className="w-1/12">
        <FontAwesomeIcon
          className={`border-2 rounded-full py-0.5 ${
            task.completed
              ? "text-green-600 border-green-600"
              : "text-red-100 border-red-200 cursor-pointer"
          }`}
          icon={faCircle}
          onClick={()=>onComplete(task)}
        />
      </span>
      <span className="w-3/12 flex justify-center gap-2">
        <FontAwesomeIcon
          className="text-gray-400 cursor-pointer hover:text-blue-500 transition-all"
          icon={faEye}
          onClick={()=>onView(task)}
        />
        <FontAwesomeIcon
          className="text-blue-500 hover:text-blue-600 cursor-pointer"
          icon={faEdit}
          onClick={()=>onEdit(task)}
        />
        <FontAwesomeIcon
          className="text-red-600 cursor-pointer hover:text-red-500 transition-all"
          icon={faTrash}
          onClick={()=>onDelete(task)}
        />
      </span>
    </div>
  );
}
