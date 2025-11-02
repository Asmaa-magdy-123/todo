import type { Task } from "../../types";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskItem from "../taskItem/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
  theme:string;
  setFilteredData: (tasks: Task[]) => void;
}

export default function TaskList({ tasks, onView, onEdit, onDelete, onComplete, setFilteredData, theme }: TaskListProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      setFilteredData(newTasks)
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div>
          {tasks.length ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                task={task}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onComplete={onComplete}
                theme={theme}
              />
            ))
          ) : (
            <p className="text-center py-4">No Data Found</p>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
