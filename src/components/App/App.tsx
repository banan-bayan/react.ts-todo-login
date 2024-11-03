import { useState, ChangeEvent, useEffect } from "react";
import classes from './App.module.scss'
import InputSection from "../InputSection/InputSection";
import TodoList from "../TodoList/TodoList";
import TodoSectionButtons from "../TodoSectionButtons/TodoSectionButtons";
import { TaskType, ButtonSectionDataType, EStatusType } from "../../Types";
import useAppNavigate from "../../hooks/useAppNavigate";
import trashIcom from '../../assets/trash.svg';

const App = () => {
  const getInitialTasks = (): TaskType[] => {
    const tasksFromStorage = localStorage.getItem("tasks");
    
    return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
  };

  const isAuth = localStorage.getItem("isAuthenticated") === "true";
  const [tasks, setTasks] = useState<TaskType[]>(getInitialTasks);
  const [inputValue, setInputValue] = useState<string>("");
  const [activeButtonId, setActiveButtonId] = useState<number>(2);

  useAppNavigate(isAuth);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks]);

  const clearTasks = () => {
    localStorage.removeItem("tasks");
    setTasks([]);
  };

  const activeTasksCount = tasks.filter(
    (task) => task.status === EStatusType.active
  ).length;

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

  const addTask = () => {
    if (!inputValue.trim()) return;

    const newTask: TaskType = {
      id: Date.now(),
      text: inputValue,
      status: EStatusType.active,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const changeStatusOnCompletedHandler = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        taskId === task.id ? { ...task, status: EStatusType.completed } : task
      )
    );
  };

  const changeStatusOnDeletedHandler = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        taskId === task.id ? { ...task, status: EStatusType.deleted } : task
      )
    );
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
