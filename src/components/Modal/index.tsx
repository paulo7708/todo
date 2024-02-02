import { useContext } from "react";
import "./style.css";
import { TasksContext } from "../../App";



export const Modal = () => {
  const { count, setCount, newTasks, setNewTasks, setTasks } = useContext(
    TasksContext
  );

  const handleNewTasksSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextTask = {
      key: count,
      content: newTasks,
      status: false,
    };

    setTasks((prevTasks : any) => [...prevTasks, nextTask]);
    setNewTasks("");
    setCount((prevCount : number) => prevCount + 1);
  };

  return (
    <div>
      <h1>Pure CSS modal box</h1>
      <div>
        <p>You can place the trigger button wherever you want.</p>
        <p>
          <label className="btn btn--blue" htmlFor="modal-1">
            Adicionar Tarefa
          </label>
        </p>
      </div>

      <form onSubmit={handleNewTasksSubmit}>
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
              <label htmlFor="modal-1" className="btnCancel" >
                <p className="auto">Cancelar</p>
              </label>
              <button className="btnAdd" type="submit">
                <p>Adicionar</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
