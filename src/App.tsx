import React from "react";
import { CodeCell } from "./components/CodeCell";
const App: React.FC = () => {
  return (
    <div className="App">
      <h2 className="title is-2">welcome to js-notebook</h2>
      <div>
        <CodeCell />
      </div>
    </div>
  );
};

export default App;
