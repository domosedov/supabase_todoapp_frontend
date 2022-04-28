import * as React from "react";
import type { NextPage } from "next";
import { useStore, useEvent } from "effector-react/scope";
import { todoModel } from "~/entities/todo";

const Home: NextPage = () => {
  const todos = useStore(todoModel.$todos);
  const fetchTodos = useEvent(todoModel.fetchTodos);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetchTodos();
  };

  return (
    <div>
      <h1>Home</h1>
      <button
        type="button"
        onClick={handleClick}
        className="px-6 py-2 rounded bg-orange-500 text-white text-sm uppercase font-bold tracking-wider"
      >
        Get Todos
      </button>
      <ul>
        {todos.map((todo) => <li key={todo.id}>{todo.title}</li>) ?? "Empty"}
      </ul>
    </div>
  );
};

export default Home;
