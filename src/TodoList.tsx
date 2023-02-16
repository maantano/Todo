import React, { useState } from "react";
import { useForm } from "react-hook-form";

// const TodoList = () => {
//   const [todo, setTodo] = useState("");
//   const [todoError, setTodoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodoError("");
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(todo);
//     if (todo.length < 10) {
//       return setTodoError("To do should be longer");
//     }
//     console.log("submit");
//   };
//   return (
// <div>
//   <form onSubmit={onSubmit}>
//     <input onChange={onChange} value={todo} placeholder="Write a to do" />
//     <button>Add</button>
//     {todoError !== "" ? todoError : ""}
//   </form>
// </div>
//   );
// };
interface IForm {
  email: string;
  firstname: string;
  lastname: string;
  usename: string;
  password: string;
  password1: string;
  [key: string]: string;
  //   extraError?: string;
  //   required가 아닌 항목이 있다면 username?: string 이렇게 작성
}

const TodoList = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  //register : 사용해서 todo State, onChange func, 포포넌트에서 props으로 안받아도도된다
  // required 를 html 옵션으러 넣었을때 개발자 도구로 삭제할 수도 있기 때문에 js 를 아용해서 rquired 옵션을 넣는다.
  // minLength를 옵션으로 집어넣을 수 있다.
  //console.log(register());
  //wathch : 변화는는 값(state)을 보여줌
  //console.log(watch());
  //handleSubmit : validation, preventDefault 을 담당하는 함수
  //   handleSubmit(데이터가 유효할 때 호출될 함수, 데이터가 유효하지 않을때 호출될 함수)
  //formState : 현재 상를를 려려줌 (에러 노출해줌)
  //   console.log(errors);
  const onValid = (data: any) => {
    console.log(errors);
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }

    // setError("extraError", { message: "Server Offline" });
  };
  // 만약 에디터가 유효하지 않다면, useForm이 에러를 보여줄것, react-hook-form이 모든 validation을 다 미챴을 때만 호출될 것
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            minLength: 5,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        {/* <span>{errors.email?.type === 'required ? "email required'}</span> */}
        <input
          {...register("firstname", {
            required: "[required] Write Here!",
            minLength: 5,
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstname?.message}</span>
        <input
          {...register("lastname", {
            required: "[required] Write Here!",
            minLength: 5,
          })}
          placeholder="Last Name"
        />
        <span>{errors?.lastname?.message}</span>
        <input
          {...register("usename", {
            required: "[required] Write Here!",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowd" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowd" : true,
            },
          })}
          placeholder="Usename"
        />
        <span>{errors?.usename?.message}</span>
        <input
          {...register("password", { required: "[required] Write Here!" })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is Required",
            minLength: { value: 5, message: "Your password is too short" },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>

        <button>Add</button>
        {/* <span>{errors?.extraError?.message}</span> */}
      </form>
    </div>
  );
};
export default TodoList;
