import Button from "../Button/Button";
import { ButtonSectionDataType } from "../../Types";
import classes from "./TodoSectionButtons.module.scss";

interface TodoSectionButtonsProps {
  buttonsData: ButtonSectionDataType[];
  activeButtonId: number;
  activeTasksCount: string;
  allTasksCount: string;
  getFilterTasks: (id: number) => void;
}
const TodoSectionButtons = ({
  allTasksCount,
  getFilterTasks,
  buttonsData,
  activeButtonId,
  activeTasksCount,
}: TodoSectionButtonsProps) => {
  return (
    <div className={classes.todoButtons}>
      {buttonsData.map(({ id, name }: ButtonSectionDataType) => {
        return (
          <Button
            key={id}
            clickHandler={() => getFilterTasks(id)}
            className={`${classes.todoButtons__button} ${id === activeButtonId ? classes.todoButtons__buttonActive : ''}`}
            id={id}
          >
            {`${name} ${id === 1 ? activeTasksCount : id === 2 ? allTasksCount : ''}`}
          </Button>
        );
      })}
    </div>
  );
};

export default TodoSectionButtons;
