import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface ToDoForm {
  toDoText: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<ToDoForm>();
  const handleValue = ({ toDoText }: ToDoForm) => {
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDoText, category },
      ...oldToDos,
    ]);
    setValue("toDoText", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValue)}>
      <input
        type="text"
        {...register("toDoText", { required: "ToDo is Required" })}
      />
      <input type="submit" value="Add Todo" />
    </form>
  );
};

export default CreateToDo;
