import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAppNavigate = (isAuth: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);
};

export default useAppNavigate;
