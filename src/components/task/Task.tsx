import style from "./Task.module.css";
import { Trash } from "@phosphor-icons/react";
import { useState } from "react";

interface bodyTask {
  key?: number;
  content: string;
  status: boolean;
  onDeleteTasks: (taskToDelete: string) => void;
  onCheckedTasks: (taskToChecked: string) => void;
  unCheckedTasks: (taskToUnchecked: string) => void;
  checked: boolean;
}

export const Task = ({ content, onDeleteTasks, onCheckedTasks, unCheckedTasks, checked }: bodyTask) => {
  const handleDeleteTasks = () => onDeleteTasks(content);
  const handleCheckedTasks = () => onCheckedTasks(content);
  const handleUncheckedTasks = () => unCheckedTasks(content);

  const handleClick = () => {
    if (checked === true ) {
      handleUncheckedTasks();

    } else {
      handleCheckedTasks();
    }
  };

  return (
    <div
      className={checked ? style.taskStyleCliked : style.taskStyle}
    >
      
      <input onClick={handleClick} type="checkbox" value='' />

      <p className={style.text}>{content}</p>
      <a className={style.trash} onClick={handleDeleteTasks}>
        <Trash className={style.trash} size={20} />
      </a>
    </div>
  );
};
