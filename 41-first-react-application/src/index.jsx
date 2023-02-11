import "./style.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const root = createRoot(document.querySelector("#root"));

const name = "React";

const myBool = true;

root.render(
  <div>
    <App>
      <h1>Hello world!</h1>
      <h2>My first React app</h2>
    </App>
  </div>
);
