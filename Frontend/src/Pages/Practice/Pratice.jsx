import { useState } from "react";

const Practice = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1 className="text-2xl font-bold">Practice</h1>
      <p>local & remote branch test</p>
      <p>other commit</p>
      <div className="flex gap-4 my-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <p>Count: {count}</p>
      </div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => setCount(count - 1)}
      >
        Decrement
      </button>
    </div>
  );
};

export default Practice;
