import { useState, ReactNode, createContext, Dispatch, SetStateAction } from "react";
import { Header } from "./components/header/Header";
import style from "./App.module.css";
import clipboard from "./assets/Clipboard.svg";
import { Task } from "./components/task/Task";
import { Modal } from "./components/Modal";

interface TaskItem {
  key: string;
  content: string;
}

interface TasksContextProps {
  tasks: TaskItem[];
  setTasks: Dispatch<SetStateAction<TaskItem[]>>;
  checkedTasks: TaskItem[];
  setCheckedTasks: Dispatch<SetStateAction<TaskItem[]>>;
  newTasks: string;
  setNewTasks: Dispatch<SetStateAction<string>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

export const TasksContext = createContext<TasksContextProps | undefined>(undefined);

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [checkedTasks, setCheckedTasks] = useState<TaskItem[]>([]);
  const [newTasks, setNewTasks] = useState<string>("");
  const [count, setCount] = useState<number>(1);

  function onDeleteTasks(taskToDelete: string) {
    const tasksWithoutDeleteOne = tasks.filter((task) => task.content !== taskToDelete);
    setTasks(tasksWithoutDeleteOne);
  }

  function onCheckedTasks(taskToChecked: string) {
    const checkedTask = tasks.find((task) => task.content === taskToChecked);

    if (checkedTask) {
      setCheckedTasks((prevCheckedTasks) => [...prevCheckedTasks, checkedTask]);
      onDeleteTasks(taskToChecked);
    }
  }

  function unCheckedTasks(taskToUnchecked: string) {
    const uncheckedTaskOne = checkedTasks.find((task) => task.content === taskToUnchecked);

    if (uncheckedTaskOne) {
      setTasks((prevTasks) => [...prevTasks, uncheckedTaskOne]);
      onDeleteTasks(taskToUnchecked);
    }
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        checkedTasks,
        setCheckedTasks,
        newTasks,
        setNewTasks,
        count,
        setCount,
      }}
    >
      <div>
        <Header />
        <Modal />

        <section>
          <div className={style.content}>
            <div className={tasks.length > 0 ? style.contentNone : style.tasks}>
              <img src={clipboard} alt="" />
              <strong>Tarefas de hoje</strong>
            </div>

            {tasks.map((task) => (
              <Task
                key={task.key}
                unCheckedTasks={unCheckedTasks}
                onCheckedTasks={onCheckedTasks}
                content={task.content}
                status={false}
                onDeleteTasks={onDeleteTasks}
                checked={false}
              />
            ))}

            <div className={checkedTasks.length > 0 ? style.contentNone : style.tasks}>
              <p>Tarefas finalizadas</p>
            </div>

            {checkedTasks.map((checkedTask) => (
              <Task
                key={checkedTask.key}
                unCheckedTasks={unCheckedTasks}
                onCheckedTasks={onCheckedTasks}
                content={checkedTask.content}
                status={false}
                onDeleteTasks={onDeleteTasks}
                checked={true}
              />
            ))}
          </div>
        </section>
      </div>
    </TasksContext.Provider>
  );
}

export default App;
