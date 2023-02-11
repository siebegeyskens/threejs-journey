import { useEffect, useState } from "React";

export default function Clicker({ keyName, color = "crimson" }) {
  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  ); // nullish coalescing operator

  useEffect(() => {
    // The way to call a f. when the component is being rendered for the first time

    // The way to call a f. when component has been disposed off.
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
