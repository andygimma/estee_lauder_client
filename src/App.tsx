import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex flex-col justify-center align-middle w-full text-center">
      <div className="w-full">Card</div>
      <div className="w-full">Map</div>
    </main>
  );
}

export default App;
