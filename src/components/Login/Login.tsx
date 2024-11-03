import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppNavigate from "../../hooks/useAppNavigate";
import Input from "../Input/Input";
import Button from "../Button/Button";
import classes from "./Login.module.scss";

const Login = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuth(true);
      navigate("/");
    } else {
      setError("Неверные данные");
    }
  };

  useAppNavigate(isAuth);

  return (
    <div className={classes.login}>
      <h2 className={classes.login__title}>ВХОД</h2>
      <div className={classes.login__container}>
        <div>
          <Input
            className={classes.login__input}
            value={username}
            type="text"
            placeholder="пользователь"
            handlerInput={(e) => setUsername(e.target.value)}
            aria-label="Имя пользователя"
          />
          <Input
            className={classes.login__input}
            value={password}
            type="password"
            placeholder="пароль"
            handlerInput={(e) => setPassword(e.target.value)}
            aria-label="Пароль"
          />
        </div>
        {error && <p className={classes.error}>{error}</p>}
        <Button className={classes.login__button} clickHandler={handleLogin}>
          ВОЙТИ
        </Button>
      </div>
    </div>
  );
};

export default Login;
