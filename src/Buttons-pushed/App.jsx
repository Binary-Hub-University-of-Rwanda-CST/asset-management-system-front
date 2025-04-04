// App.jsx
import React from "react";
import Button from "./Components/Buttons";

const App = () => {
  return (
    <React.Fragment>
      <h1
        style={{
          textAlign: "center",
          fontSize: "17px",
          marginBottom: "20px",
        }}
      >
        Some of Reusable Button Components
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Button variant="success">Save/Success Button</Button>
        <Button variant="danger">Remove Button</Button>
        <Button variant="warning">Warning/saving Button</Button>
        <Button variant="primary"> Sign in Button</Button>
        <Button variant="secondary">Stock Button</Button>
        <Button variant="dark">Dark Button</Button>
        <Button variant="light">Create Button</Button>
      </div>
    </React.Fragment>
  );
};

export default App;
