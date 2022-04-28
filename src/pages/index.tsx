import * as React from "react";
import type { NextPage } from "next";
import { getTodos, Todo } from "~/supabase_client";

const Home: NextPage = () => {
  const [todos, setTodos] = React.useState<Todo[] | null>([]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    getTodos().then(setTodos);
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
        {todos?.map((todo) => <li key={todo.id}>{todo.title}</li>) ?? "Empty"}
      </ul>
    </div>
  );
};

export default Home;
