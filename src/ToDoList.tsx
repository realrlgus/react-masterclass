import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} placeholder="Write a to do" value={toDo} />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input placeholder="Email" {...register("Email")} />
        <input placeholder="First Name" {...register("First Name")} />
        <input placeholder="Last Name" {...register("Last Name")} />
        <input placeholder="Username" {...register("Username")} />
        <input placeholder="Password" {...register("Password")} />
        <input placeholder="Password1" {...register("Password1")} />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
