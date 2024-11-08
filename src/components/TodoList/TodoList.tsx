import TodoItem from "../TodoItem/TodoItem";
import { TaskType } from "../../Types";
import classes from "./TodoList.module.scss";

interface TodoListProps {
  tasks: TaskType[];
  changeStatusOnCompletedHandler: (id: number) => void;
  changeStatusOnDeletedHandler: (id: number) => void;
  completeNameBtn: string;
  trashIcon: string;
}
const TodoList = ({
  tasks,
  changeStatusOnCompletedHandler,
  changeStatusOnDeletedHandler,
  completeNameBtn,
  trashIcon,
}: TodoListProps) => {
  return (
    <ul className={classes.todoList}>
      {tasks.map(({ id, text, status }) => {
        return (
          <TodoItem
          trashIcon={trashIcon}
            completeNameBtn={completeNameBtn}
            key={id}
            status={status}
            changeStatusOnCompletedHandler={() =>
              changeStatusOnCompletedHandler(id)
            }
            changeStatusOnDeletedHandler={() =>
              changeStatusOnDeletedHandler(id)
            }
          >
            {text}
          </TodoItem>
        );
      })}
    </ul>
  );
};

export default TodoList;
