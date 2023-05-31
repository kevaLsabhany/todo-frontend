import React, { useContext } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { AppContext } from "../components/AppProvider";

const Dashboard: React.FC = () => {
  const { userInfo, logout } = useContext(AppContext);
  return (
    <div className="todo-app">
      <div className="dashboard-header">
        <p className="name">
          Name: {userInfo.firstname + " " + userInfo.lastname}
        </p>
        <button onClick={() => logout()}>logout</button>
      </div>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Dashboard;
