import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from "./containers/Chat";
import Login from "./containers/Login";
import RouteModule from "./routes";

const App: React.FC = () => {
  return(
  <div>
    <RouteModule/>
  </div> ) 
}

export default App;
