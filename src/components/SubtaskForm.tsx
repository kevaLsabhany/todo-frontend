import { useState } from "react";

interface SubtaskFormProps {
  todoId: number;
  handleAddSubtask: (id: number, text: string) => void;
}
const SubtaskForm: React.FC<SubtaskFormProps> = ({
  todoId,
  handleAddSubtask,
}) => {
  const [text, setText] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    handleAddSubtask(todoId, text);
    setText("");
  };
  return (
    <form>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Add Subtask
      </button>
    </form>
  );
};
export default SubtaskForm;
