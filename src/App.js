// import { useState, Profiler, useRef } from "react";
import ReactDOM from "react-dom/client";
import Navigation from "./components/navigation";

const App = () => {
  return (
    <Navigation />
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
export default App