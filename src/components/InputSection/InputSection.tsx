import Button from "../Button/Button";
import Input from "../Input/Input";
import classes from "./InputSection.module.scss";

interface InputSectionProps {
  handlerInput: React.ChangeEventHandler<HTMLInputElement>;
  addTaskHandler: () => void;
  clearAllTasks: () => void;
  buttonAddTaskName: string;
  buttonClearTasks: string;
  type: string;
  inputValue: string;
  placeholderInput: string;
  keyPressHandler: React.KeyboardEventHandler<HTMLInputElement>;
}

const InputSection = ({
  clearAllTasks,
  buttonClearTasks,
  addTaskHandler,
  buttonAddTaskName,
  type,
  inputValue,
  handlerInput,
  keyPressHandler,
  placeholderInput,
}: InputSectionProps) => {
  return (
    <div className={classes.inputSection}>
      <Button
        className={classes.input__addButton}
        clickHandler={addTaskHandler}
      >
        {buttonAddTaskName}
      </Button>

      <Input
        placeholder={placeholderInput}
        className={classes.input}
        keyPressHandler={keyPressHandler}
        type={type}
        value={inputValue}
        handlerInput={handlerInput}
      />

      <Button
        className={classes.input__clearButton}
        clickHandler={clearAllTasks}
      >
        {buttonClearTasks}
      </Button>
    </div>
  );
};

export default InputSection;
