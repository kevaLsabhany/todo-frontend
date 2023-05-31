import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AppProvideProps {
  children: React.ReactNode;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  subtasks: Subtask[];
}

interface Subtask {
  id: number;
  text: string;
  completed: boolean;
}

interface AppContextType {
  todos: Todo[];
  userInfo: UserInfoType;
  message: string;
  verifyLogin: (username: string, password: string) => void;
  logout: () => void;
  handleToggle: (id: number) => void;
  handleAddTodo: (text: string) => void;
  handleAddSubtask: (id: number, text: string) => void;
}

interface UserInfoType {
  token: string;
  firstname: string;
  lastname: string;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider: React.FC<AppProvideProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfoType>({} as UserInfoType);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const verifyLogin = async (username: string, password: string) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          username,
          password,
        }
      );
      setMessage("");
      setUserInfo(response.data);
      localStorage.setItem("jwtToken", response.data.token);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  const handleAddTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
        subtasks: [],
      },
    ]);
  };

  const handleAddSubtask = (id: number, text: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo: Todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            subtasks: [
              ...todo.subtasks,
              { id: Date.now(), completed: false, text },
            ],
          };
        }
        return todo;
      })
    );
  };

  const handleToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          const updatedSubtasks = todo.subtasks.map((subtask) =>
            subtask.id === id
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          );
          return { ...todo, subtasks: updatedSubtasks };
        }
      })
    );
  };
  const data: AppContextType = {
    todos,
    handleAddSubtask,
    handleAddTodo,
    handleToggle,
    userInfo,
    message,
    verifyLogin,
    logout,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppProvider;
