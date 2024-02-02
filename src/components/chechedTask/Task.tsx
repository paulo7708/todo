import style from "./Task.module.css";
import { CheckCircle, Circle, Trash } from "@phosphor-icons/react";
import { useState } from "react";

interface bodyTask {
  key?: number;
  content: string;
  status: boolean;
  onDeleteTasks: (taskToDelete: string) => void,
  onCheckedTasks: (taskToChecked: string) => void,
  unCheckedTasks: (taskToUnchecked: string) => void,
}

export const Task = ({ content, onDeleteTasks, onCheckedTasks, unCheckedTasks }: bodyTask) => {
  const [isActive, setIsActive] = useState(false);

  function handleDeleteTasks() {
    onDeleteTasks(content)
  }

  function handleCheckedTasks() {
    onCheckedTasks(content)
  }

  const handleClick = () => {
    if (isActive === false) {
      setIsActive(true);
      handleCheckedTasks();
    } else {
      setIsActive(false);
    }
  };
  

  return (
    <div
      className={isActive === true ? style.taskStyleCliked : style.taskStyle}
    >
      <a onClick={handleClick}>
        <Circle className={style.circle} size={25} />
        <CheckCircle className={style.checkCircle} size={25} />
      </a>
      <p className={style.text}>{content}</p>
      <a className={style.trash} onClick={handleDeleteTasks}>
        <Trash className={style.trash} size={20} />
      </a>
    </div>
  );
};
