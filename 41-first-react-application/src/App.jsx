import { useRef, useState, useEffect, useMemo } from "react";
import Clicker from "./Clicker";
import People from "./People";

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

  // useMemo: code in function is only executed when state in dependency array changes
  // If there is no dependency the function will only be executed once
  // You can use it to return a value and that value will be "cached", meaning it won't change when the component function is called again (re-rendered) (like when a state changes)
  const colors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < clickerAmount; i++) {
      colors.push(`hsl(${Math.random() * 360}deg, 70%, 70%)`);
    }
    return colors;
  }, []);

  // How to acces dom elements?
  // you can have a ref prop like this: "ref={buttonRef}"
  // this buttonRef won't be accesable after first draw (bc. the jsx is not loaded in dom)
  // But it will be accesable in useRef() (useRef is executed after the whole component is rendered)
  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.style.borderRadius = "20px";
    buttonRef.current.style.border = "none";
    buttonRef.current.style.padding = "0.5em";
  }, []);

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
              // problem: if a Clicker is clicked the App count state changes
              // this makes the whole component rerender
              // and makes the color below a new color
              color={colors[index]}
            ></Clicker>
          ))}
        </>
      ) : null}
      <button ref={buttonRef} onClick={toggleClicker}>
        {hasClicker ? "Hide clicker" : "Show clicker"}
      </button>
      <People></People>
    </>
  );
}
