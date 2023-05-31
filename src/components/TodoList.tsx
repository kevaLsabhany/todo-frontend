import { useContext } from "react";
import SubtaskForm from "./SubtaskForm";
import { AppContext } from "./AppProvider";

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

const TodoList: React.FC = () => {
  const { todos, handleToggle, handleAddSubtask } = useContext(AppContext);
  return (
    <div className="todo-list">
      {todos?.map((todo: Todo) => (
        <div className="todo">
          <div className="task">
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
            </div>
            <div>{todo?.text}</div>
          </div>
          <div className="subtask-list">
            {todo?.subtasks?.map((subtask: Subtask) => (
              <div className="subtask">
                <div>
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => handleToggle(subtask.id)}
                  />
                </div>
                <div>{subtask.text}</div>
              </div>
            ))}
          </div>
          <div className="subtask-form">
            <SubtaskForm todoId={todo.id} handleAddSubtask={handleAddSubtask} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
