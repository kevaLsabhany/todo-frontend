import { useState, useContext } from "react";
import { AppContext } from "./AppProvider";

const TodoForm: React.FC = () => {
  const { handleAddTodo } = useContext(AppContext);
  const [text, setText] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    if (!text) return;
    e.preventDefault();
    handleAddTodo(text);
    setText("");
  };
  return (
    <div className="todo-form">
      <form>
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e)}>Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
