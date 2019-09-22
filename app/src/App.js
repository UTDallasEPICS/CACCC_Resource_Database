import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Route} from "react-router-dom";
import ClientPages from './Components/ClientPages'
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Route path="/ClientPages" component = {ClientPages}/>
    </BrowserRouter>
  );
}

export default App;
