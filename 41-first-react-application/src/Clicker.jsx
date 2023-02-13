import { useEffect, useState } from "react";

export default function Clicker({ keyName, color, increment = "crimson" }) {
  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  ); // nullish coalescing operator

  useEffect(() => {
    // The way to call a f. when the component is being rendered for the first time
    // inside this function

    // The way to call a f. when component has been disposed off.
    // inside the function returned
    return () => {
      localStorage.removeItem(keyName);
    };
  }, []);

  // only on state change of "count"
  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  const buttonClick = () => {
    setCount(count + 1);
    increment();
  };

  const destroy = () => {
    localStorage.clear();
  };

  return (
    <div>
      <p
        style={{
          color: color,
        }}
      >
        Click count: {count}
      </p>
      <button onClick={buttonClick}>Click me</button>
    </div>
  );
}
