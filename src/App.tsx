import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DeckStateManager } from './UI/deck_state_manager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DeckStateManager/>
      </header>
    </div>
  );
}

export default App;
