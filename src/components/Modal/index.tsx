import { useContext, useState } from "react";
import "./style.css"
import { TasksContext } from "../../App";


interface NewTask {
  count: number,
  setCount: () => void,
  newTasks: string,
  setNewTasks: any,
  tasks: '',
  setTasks: () => void,
}

function handleNewTasks() {
  event?.preventDefault();

  const { count, setCount, newTasks, setNewTasks, tasks, setTasks }: NewTask = useContext(TasksContext)

  const nextTask = {
    key: count,
    content: newTasks,
    status: false,
  };

  setTasks([...tasks, nextTask]);
  setNewTasks("");

  setCount((state: number) => {
    return state + 1
  })
}


export const Modal = () => {
  const { newTasks, setNewTasks } = useContext(TasksContext)


  return (
    <div>
      <h1>Pure CSS modal box</h1>
      <div>
        <p>You can place trigger button wherever you want.</p>
        <p>
          <label className="btn btn--blue" htmlFor="modal-1">Adicionar Tarefa</label>
        </p>
      </div>

      <form onSubmit={handleNewTasks}>
        <input className="modal-state" id="modal-1" type="checkbox" />
        <div className="modal">
          <label className="modal__bg" htmlFor="modal-1"></label>
          <div className="modal__inner">
            <label className="modal__close" htmlFor="modal-1"></label>
            <h2>Nova tarefa</h2>
            <div>
              <h3>Título</h3>
              <input
                name="NewTasks"
                className="NewTasks"
                placeholder="Digite"
                onChange={(event) => {
                  setNewTasks(event.target.value);
                }}
                value={newTasks}
                required
              />
            </div>
            <div className="btnContainer">
              <button className="btnCancel" type="submit">
                <p>Cancelar</p>
              </button>
              <button onClick={handleNewTasks} className="btnAdd" type="submit">
                <p>Adicionar</p>
              </button>
            </div>
          </div>
        </div>
      </form>



    </div>
  )
}