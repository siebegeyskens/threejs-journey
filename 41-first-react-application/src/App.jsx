import { useState, useEffect } from "react";
import Clicker from "./Clicker";

export default function App({ clickerAmount, children }) {
  const [hasClicker, setHasClicker] = useState(true);
  const [count, setCount] = useState(0);

  const toggleClicker = () => {
    setHasClicker(!hasClicker);
  };

  // function is called by clicker components:
  // see "moving data up" threejs-journey
  // this function is sent to Clicker components through the props
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {children}
      <h3>Total count: {count}</h3>
      {hasClicker ? (
        <>
          {/* use map to loop
            // You can't use a for loop inside JSX so this is a work-around:
            // Create an array of clickerAmount lenght
            // Spread it out in a new array (otherwise we can't map on it)
            // Use map to return components! 
            // Use index to get differt keynames*/}
          {[...Array(clickerAmount)].map((value, index) => (
            <Clicker
              key={index}
              increment={increment}
              keyName={"count" + index}
              color="chocolate"
            ></Clicker>
          ))}
        </>
      ) : null}
      <button onClick={toggleClicker}>
        {hasClicker ? "Hide clicker" : "Show clicker"}
      </button>
    </>
  );
}
