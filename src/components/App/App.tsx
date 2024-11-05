import { useState, ChangeEvent } from "react";
import classes from "./App.module.scss";
import InputSection from "../InputSection/InputSection";
import TodoList from "../TodoList/TodoList";
import TodoSectionButtons from "../TodoSectionButtons/TodoSectionButtons";
import { TaskType, ButtonSectionDataType, EStatusType } from "../../Types";
import useAppNavigate from "../../hooks/useAppNavigate";
import trashIcom from "../../assets/trash.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/UseAppDispatchUseAppSelector";
import { addTaskStore, clearTasksStore, changeTaskStatusOnCompleted, changeTaskStatusOnDeleted } from "../../store/tasksSlice";

const App = () => {

  const isAuth = localStorage.getItem("isAuthenticated") === "true";

  useAppNavigate(isAuth);
  
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);
  const [inputValue, setInputValue] = useState<string>("");
  const [activeButtonId, setActiveButtonId] = useState<number>(2);



  const addTask = () => {
    if (inputValue.trim()) {
      dispatch(addTaskStore(inputValue));
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const clearTasks = () => dispatch(clearTasksStore());

  const activeTasksCount = tasks.filter((t: TaskType) => t.status === EStatusType.active).length;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const applyFilter = (filterId: number): TaskType[] => {
    switch (filterId) {
      case 1:
        return tasks.filter(({ status }) => status === EStatusType.active);
      case 3:
        return tasks.filter(({ status }) => status === EStatusType.completed);
      case 4:
        return tasks.filter(({ status }) => status === EStatusType.deleted);
      default:
        return tasks;
    }
  };

  const changeStatusOnCompletedHandler = (taskId: number) => {
     dispatch(changeTaskStatusOnCompleted({id: taskId}));
  };

  const changeStatusOnDeletedHandler = (taskId: number) => {
    dispatch(changeTaskStatusOnDeleted({id: taskId}));
  };

  const buttonsData: ButtonSectionDataType[] = [
    { id: 1, name: "ТЕКУЩИЕ ДЕЛА" },
    { id: 2, name: "ВСЕ ДЕЛА" },
    { id: 3, name: "ВЫПОЛНЕННЫЕ ДЕЛА" },
    { id: 4, name: "КОРЗИНА" },
  ];

  return (
    <div className={classes.todoApp}>
      <InputSection
        placeholderInput="Пополнить список ..."
        keyPressHandler={handleKeyDown}
        handlerInput={handleInput}
        
        addTaskHandler={addTask}
        clearAllTasks={clearTasks}
        buttonAddTaskName="+ ДОБАВИТЬ"
        buttonClearTasks="ОЧИСТИТЬ &#8801;"
        type="text"
        inputValue={inputValue}
      />
      <main className={classes.main}>
        <TodoSectionButtons
          getFilterTasks={setActiveButtonId}
          activeTasksCount={`(${activeTasksCount})`}
          allTasksCount={`(${tasks.length})`}
          activeButtonId={activeButtonId}
          buttonsData={buttonsData}
        />
        <TodoList
          completeNameBtn="✓"
          trashIcom={trashIcom}
          tasks={applyFilter(activeButtonId)}
          changeStatusOnCompletedHandler={changeStatusOnCompletedHandler}
          changeStatusOnDeletedHandler={changeStatusOnDeletedHandler}
        />
      </main>
    </div>
  );
};

export default App;
