import Button from "../Button/Button";
import classes from "./TodoItem.module.scss";
import { EStatusType } from "../../Types";

interface TodoItemProps {
  children: React.ReactNode;
  changeStatusOnCompletedHandler: () => void;
  changeStatusOnDeletedHandler: () => void;
  completeNameBtn: string;
  deletedNameBtn: string;
  status: string;
}

const TodoItem = ({
  children,
  changeStatusOnCompletedHandler,
  changeStatusOnDeletedHandler,
  completeNameBtn,
  deletedNameBtn,
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
            {deletedNameBtn}
          </Button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
