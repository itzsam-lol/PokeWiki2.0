import React from 'react';
import './ControlPad.css';

interface ControlPadProps {
  navigate: (direction: 'next' | 'prev') => void;
  goBack: () => void;
  randomPokemon: () => void;
  onSearch: () => void;
  setIsShiny: (shiny: boolean) => void;
  isShiny: boolean;
}

const ControlPad: React.FC<ControlPadProps> = ({
  navigate,
  goBack,
  randomPokemon,
  onSearch,
  setIsShiny,
  isShiny
}) => {
  return (
    <div className="control-pad-container">
      <div className="control-section">
        {/* D-Pad */}
        <div className="dpad-container">
          <button className="dpad-btn dpad-up" onClick={() => navigate('prev')} title="Previous Pokemon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
          </button>
          <button className="dpad-btn dpad-down" onClick={() => navigate('next')} title="Next Pokemon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
          <button className="dpad-btn dpad-left" onClick={goBack} title="Go Back">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </button>
          <button className="dpad-btn dpad-right" onClick={randomPokemon} title="Random Pokemon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.59 13.41L9.17 12l1.42-1.41L12 12l-1.41 1.41zM16.59 7.58L15.17 6.17 18.83 2.5l1.41 1.41-3.65 3.67zM13 2l-1 1 3.59 3.59L16.17 6 13 2zm6.83 18.34l-1.41 1.41-3.66-3.65 1.42-1.42 3.65 3.66zM2.81 2.81L1.39 4.22l7.07 7.07-1.41 1.41 1.41 1.42L9.88 12.7 18.17 21l1.42-1.42L2.81 2.81z"/>
            </svg>
          </button>
          <div className="dpad-center"></div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn btn-b" onClick={goBack} title="Back">
            B
          </button>
          <button className="action-btn btn-a" onClick={onSearch} title="Search">
            A
          </button>
        </div>
      </div>

      {/* Additional Controls */}
      <div className="additional-controls">
        <button 
          className={`control-button ${isShiny ? 'active' : ''}`}
          onClick={() => setIsShiny(!isShiny)}
          title="Toggle Shiny"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          {isShiny ? 'Shiny' : 'Normal'}
        </button>
        
        <button 
          className="control-button"
          onClick={onSearch}
          title="Search Pokemon"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          Search
        </button>
        
        <button 
          className="control-button"
          onClick={randomPokemon}
          title="Random Pokemon"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
          </svg>
          Random
        </button>
      </div>

      {/* Yellow Info Screen */}
      <div className="info-screen">
        <div className="info-screen-content">
          Use D-pad to navigate<br/>
          A: Search | B: Back
        </div>
      </div>
    </div>
  );
};

export default ControlPad;
