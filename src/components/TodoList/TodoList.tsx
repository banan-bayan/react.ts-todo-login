import TodoItem from "../TodoItem/TodoItem";
import { TaskType } from "../../Types";
import classes from "./TodoList.module.scss";

interface TodoListProps {
  tasks: TaskType[];
  changeStatusOnCompletedHandler: (id: number) => void;
  changeStatusOnDeletedHandler: (id: number) => void;
  completeNameBtn: string;
  trashIcom: string;
}
const TodoList = ({
  tasks,
  changeStatusOnCompletedHandler,
  changeStatusOnDeletedHandler,
  completeNameBtn,
  trashIcom,
}: TodoListProps) => {
  return (
    <ul className={classes.todoList}>
      {tasks.map(({ id, text, status }) => {
        return (
          <TodoItem
          trashIcom={trashIcom}
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
