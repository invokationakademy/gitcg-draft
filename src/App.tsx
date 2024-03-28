import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DeckStateManager } from './UI/deck_state_manager';
import { SocialsRenderer } from './Socials/socials_renderer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DeckStateManager/>
      </header>
      <SocialsRenderer/>
    </div>
  );
}

export default App;
