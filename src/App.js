import React, { useState, Profiler } from "react";
import ReactDOM from "react-dom/client";
import Navigation from "./components/navigation";
import { UserProvider } from './components/context';
import Dashboard from './components/Dashboard';
import {MyContext} from './components/context'

const App = (props) => {
  return (
    <MyContext.Provider value={{ data: 'John Doe' }}>
      <Navigation />
    </MyContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
export default App