import { useState, useEffect } from "react";
import Clicker from "./Clicker";

export default function App({ children }) {
  const [hasClicker, setHasClicker] = useState(true);

  const toggleClicker = () => {
    setHasClicker(!hasClicker);
  };

  return (
    <>
      {children}
      {hasClicker ? (
        <>
          <Clicker keyName="countA" color="chocolate"></Clicker>
          <Clicker keyName="countB" color="darkOrchid"></Clicker>
          <Clicker keyName="countC"></Clicker>
        </>
      ) : null}
      <button onClick={toggleClicker}>
        {hasClicker ? "Hide clicker" : "Show clicker"}
      </button>
    </>
  );
}
