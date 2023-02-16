import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

interface IForm {
  toDo: string;
}

const TodoList2 = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // const toDos = useRecoilValue(toDoState);
  // const setToDos = useSetRecoilState(toDoState);
  ///////////////////////////////////////////////////////////////////////////

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleVallid = ({ toDo }: IForm) => {
    //중요한건 아래 input에 register함수 안의 이름이 위에 data로 그대로 들어간다는 것!!!
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    // setToDos 안에 ['1234'] 이렇게 state 를 직접 넣을 수도 있고 함수 형태로 ()=> ~~ 도 넣을 수 있는데, 함수형태로 넣으면 리턴값이 state가 될것이다.
    // 함수형으로 사용하면 현재 값을 가져올수 있다!!
    setValue("toDo", "");
  };
  console.log(toDos);
  return (
    <div>
      <h1>To dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleVallid)}>
        <input
          {...register("toDo", { required: "Please write a Todo" })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList2;
