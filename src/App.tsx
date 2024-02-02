import { useState } from "react";
import { Header } from "./components/header/Header";
import style from "./App.module.css";
import clipboard from "./assets/Clipboard.svg";
import { Task } from "./components/task/Task";
import { Modal } from "./components/Modal";

interface TaskProviderProps {
  children: ReactNode
}

export const TasksContext = createContext({} as any)

function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [checkedTasks, setCheckedTasks] = useState<any[]>([]);
  const [newTasks, setNewTasks] = useState("");
  const [count, setCount] = useState(1);

  function onDeleteTasks(taskToDelete: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => {

      return task.content !== taskToDelete;
    })

    setTasks(tasksWithoutDeleteOne)
  }

  function onCheckedTasks(taskTochecked: string) {
    const checkedTask = tasks.find((task) => task.content === taskTochecked);

    if (checkedTasks) {
      setCheckedTasks([...checkedTasks, checkedTask])

      onDeleteTasks(taskTochecked)
    }

  }

  function unCheckedTasks(taskUnchecked: string) {
    const uncheckedTaskOne = checkedTasks.find((task) => task.content === taskUnchecked);

    if (uncheckedTaskOne) {
      setTasks([...tasks, uncheckedTaskOne])

      onDeleteTasks(taskUnchecked)
    }

  }

  return (
    <TasksContext.Provider value={{ tasks, setTasks, checkedTasks, setCheckedTasks, newTasks, setNewTasks, count, setCount }}>
      <div>
        <Header />
        <Modal />

        <section>
          <div className={style.content}>


            <div className={tasks.length > 0 ? style.contentNone : style.tasks}>
              <img src={clipboard} alt="" />
              <strong>Tarefas de hoje</strong>

            </div>

            {tasks.map((task) => {
              return (
                <Task key={task.key} unCheckedTasks={unCheckedTasks} onCheckedTasks={onCheckedTasks} content={task.content} status={false} onDeleteTasks={onDeleteTasks} checked={false} />
              );
            })}

            <div className={checkedTasks.length > 0 ? style.contentNone : style.tasks}>
              <p>Tarefas finalizadas</p>
            </div>

            {checkedTasks.map((checkedTasks) => {
              return (
                <Task key={checkedTasks.key} unCheckedTasks={unCheckedTasks} onCheckedTasks={onCheckedTasks} content={checkedTasks.content} status={false} onDeleteTasks={onDeleteTasks} checked={true} />
              );
            })}
          </div>
        </section>
      </div>
    </TasksContext.Provider>
  );
}

export default App;
