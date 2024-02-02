import "./Header.module.css";
import logo from "../../assets/Logo.svg";
import style from "./Header.module.css"

export const Header = () => {
  return (
    <header className={style.header}>
      <img src={logo} alt="" />
    </header>
  );
};
