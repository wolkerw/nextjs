"use client";
import { useState } from "react";

interface CounterProps {
  initialCounter?: number;
}

const Counter: React.FC<CounterProps> = ({ initialCounter }) => {
  console.log("counter initialCounter", initialCounter);

  const [count, setCount] = useState(initialCounter || 0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(initialCounter || 0)}>Reset</button>
    </div>
  );
};

export default Counter;
