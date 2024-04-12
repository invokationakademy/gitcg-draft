import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DeckStateManager } from './UI/deck_state_manager';
import { SocialsRenderer } from './Socials/socials_renderer';
import { DescriptionContextState } from './UI/Description/description_context';
import { DescriptionRenderer } from './UI/Description/description_renderer';
import { LocalizationContextComponent } from './localization/localizationContext';

function App() {
  return (
    <LocalizationContextComponent>
      <DescriptionContextState>
        <div className="App">
          <header className="App-header">
            <h2>Genius Invokation Drafter (v0.3)</h2>
            <label style={{fontSize: '20px'}}>New: Character choices are now always 3 different elements!</label>
            <DeckStateManager/>
            <br/>
            <SocialsRenderer/>
            <DescriptionRenderer/>
          </header>
        </div>
      </DescriptionContextState>
    </LocalizationContextComponent>
  );
}

export default App;
