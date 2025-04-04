import React from "react";
import Alert from "./Alert";
import { variants } from "./variants";

function App() {
  return (
    <div className="">
      {variants.map((variant, index) => (
        <Alert key={index} variant={variant} />
      ))}
    </div>
  );
}

export default App;
