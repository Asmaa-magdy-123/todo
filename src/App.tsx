import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import TaskList from "./components/taskList/TaskList";
import TaskForm from "./components/taskForm/TaskForm";
import FilterButtons from "./components/filterButtons/FilterButtons";
import SearchBar from "./components/searchbar/Searchbar";
import SortOptions from "./components/sortOptions/SortOptions";
import TaskDetailsModal from "./components/taskDetails/TaskDetails";
import type { newTaskType, Task } from "./types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { Toaster } from "react-hot-toast";

import {
  addTask,
  completeTask,
  deleteTask,
  editTask,
  setTasks,
} from "./slices/taskSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import EditModal from "./components/edit/EditModal";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.data);
  const [newTask, setNewTask] = useState<newTaskType>({
    userId: 1,
    id: 0,
    title: "",
    desc: "",
    priority: "",
    date: new Date(),
    completed: false,
  });
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSortByPriority, setSelectedSortByPriority] = useState("");
  const [selectedSortByDate, setSelectedSortByDate] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Task | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (res.ok) {
          const data = await res.json();
          dispatch(setTasks(data));
        } else {
          console.log("error fetching data");
        }
      } catch (e) {
        console.log("error in fetch:", e);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...tasks];

    if (search)
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );

    if (selectedPriority)
      filtered = filtered.filter((t) => t.priority === selectedPriority);

    if (selectedDate)
      filtered = filtered.filter(
        (t) => new Date(t.date).toDateString() === selectedDate.toDateString()
      );

    if (isActive === "Completed")
      filtered = filtered.filter((t) => t.completed);
    if (isActive === "Not Completed")
      filtered = filtered.filter((t) => !t.completed);

    if (selectedSortByPriority) {
      filtered.sort((a, b) => {
        const order = selectedSortByPriority === "high" ? -1 : 1;
        if (a.priority === b.priority) return 0;
        return a.priority === "high" ? order : -order;
      });
    }

    if (selectedSortByDate) {
      filtered.sort((a, b) => {
        const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
        return selectedSortByDate === "newest" ? -diff : diff;
      });
    }

    setFilteredData(filtered);
  }, [
    search,
    selectedPriority,
    selectedDate,
    isActive,
    selectedSortByPriority,
    selectedSortByDate,
    tasks,
  ]);

  const handleAddTask = (newTask: Task) => {
    dispatch(addTask(newTask));
    setOpenModal(false);
  };

  const handleDelete = (task: Task) => {
    dispatch(deleteTask(task.id));
  };

  const handleCompleteTask = (task: Task) => {
    dispatch(completeTask(task.id));
  };

  const handleEditTask = (task: Task) => {
    dispatch(editTask(task));
  };

  const handleDarkMode = () => {
    const oldTheme = localStorage.getItem("Theme") || "light";
    const newTheme = oldTheme === "light" ? "dark" : "light";
    localStorage.setItem("Theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="main h-screen flex justify-center items-center ">
      <div>
        {theme === "light" ? (
          <FontAwesomeIcon
            onClick={() => handleDarkMode()}
            className=" top-1 px-2 py-2 md:top-5 lg:top-8 text-lg border rounded-full bg-white shadow-md lg:py-3 lg:px-2.5 fixed"
            icon={faSun}
          />
        ) : (
          <FontAwesomeIcon
            onClick={() => handleDarkMode()}
            className=" top-1 px-2 py-2 md:top-5 lg:top-8 text-lg border rounded-full bg-white shadow-md lg:py-3 lg:px-2.5 fixed"
            icon={faMoon}
          />
        )}
      </div>
      <div
        className={`container  rounded-xl shadow-md w-full md:w-[70%] lg:w-[60%] p-5 ${
          theme === "light" ? "bg-white" : "bg-gray-900 text-white"
        } `}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold ">To Do App</h1>
          <button
            className="bg-blue-700 text-white px-4 py-1 rounded-lg"
            onClick={() => setOpenModal(true)}
          >
            + Add Task
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar search={search} setSearch={setSearch} theme={theme} />

        <div className="flex flex-col-reverse lg:flex-row gap-2 items-start justify-between">
          {/* Filters */}
          <FilterButtons
            isActive={isActive}
            setIsActive={setIsActive}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            theme={theme}
          />

          {/* Sort */}
          <SortOptions
            selectedSortByPriority={selectedSortByPriority}
            setSelectedSortByPriority={setSelectedSortByPriority}
            selectedSortByDate={selectedSortByDate}
            setSelectedSortByDate={setSelectedSortByDate}
            theme={theme}
          />
        </div>
        {/* Task List */}
        <div className="w-full h-[50vh] overflow-y-auto custom-scroll">
          <TaskList
            tasks={filteredData}
            onView={(item) => {
              setSelectedItem(item);
              setOpenDetailsModal(true);
            }}
            onEdit={(item) => {
              setSelectedItem(item);
              setOpenEditModal(true);
            }}
            onDelete={handleDelete}
            onComplete={handleCompleteTask}
            setFilteredData={setFilteredData}
            theme={theme}
          />
        </div>
      </div>

      {/* Add Task Modal */}
      {openModal && (
        <Modal onClose={() => setOpenModal(false)} theme={theme}>
          <TaskForm
            newTask={newTask!}
            setNewTask={setNewTask}
            onSubmit={handleAddTask}
          />
        </Modal>
      )}

      {/* Task Details Modal */}
      {openDetailsModal && selectedItem && (
        <TaskDetailsModal
          task={selectedItem}
          onClose={() => setOpenDetailsModal(false)}
          theme={theme}
        />
      )}

      {openEditModal && (
        <Modal onClose={() => setOpenEditModal(false)} theme={theme}>
          <EditModal task={selectedItem} onSave={handleEditTask} />
        </Modal>
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
