import Button from "../Button/Button";
import classes from "./TodoItem.module.scss";
import { EStatusType } from "../../Types";

interface TodoItemProps {
  children: React.ReactNode;
  changeStatusOnCompletedHandler: () => void;
  changeStatusOnDeletedHandler: () => void;
  completeNameBtn: string;
  trashIcon: string;
  status: string;
}

const TodoItem = ({
  children,
  changeStatusOnCompletedHandler,
  changeStatusOnDeletedHandler,
  completeNameBtn,
  trashIcon,
  status,
}: TodoItemProps) => {

  return (
    <li className={classes.todoItem}>
      <span className={classes.todoItem__text}>{children}</span>
      {status !== EStatusType.deleted && status !== EStatusType.completed && (
        <>
          <Button
            className={classes.todoItem__button}
            clickHandler={changeStatusOnCompletedHandler}
          >
            {completeNameBtn}
          </Button>
          <Button
            className={classes.todoItem__button}
            clickHandler={changeStatusOnDeletedHandler}
          >
            <img className={classes.todoItem__img} src={trashIcon} alt="Корзина" />
          </Button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
