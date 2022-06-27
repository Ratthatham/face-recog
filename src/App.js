import React from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Logo/>
      {/* <Rank/>
      <Navagation/> */}
    </div>
  );
}

export default App;
