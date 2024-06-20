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
            <DeckStateManager/>
            <DescriptionRenderer/>
        </div>
      </DescriptionContextState>
    </LocalizationContextComponent>
  );
}

export default App;
