import React from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Logo/>
      <ImageLinkForm/>
      <Rank/>
    </div>
  );
}

export default App;
