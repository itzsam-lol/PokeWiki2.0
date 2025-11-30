import React from 'react';
import './TabPanel.css';
import { Pokemon, Species, EvolutionChain } from '../types';
import { formatPokemonName, getPokemonIdFromUrl } from '../api/pokewiki';

interface TabPanelProps {
  pokemon: Pokemon | null;
  species: Species | null;
  evolution: EvolutionChain | null;
  tab: 'summary' | 'moves' | 'abilities' | 'evolution';
  setTab: (tab: 'summary' | 'moves' | 'abilities' | 'evolution') => void;
}

const TabPanel: React.FC<TabPanelProps> = ({ pokemon, species, evolution, tab, setTab }) => {
  const parseEvolutionChain = (chain: any): string[] => {
    const names: string[] = [];
    let current = chain;
    
    while (current) {
      names.push(formatPokemonName(current.species.name));
      current = current.evolves_to[0];
    }
    
    return names;
  };

  return (
    <div className="tab-panel">
      <div className="tab-buttons">
        <button 
          className={`tab-btn ${tab === 'summary' ? 'active' : ''}`}
          onClick={() => setTab('summary')}
        >
          Summary
        </button>
        <button 
          className={`tab-btn ${tab === 'moves' ? 'active' : ''}`}
          onClick={() => setTab('moves')}
        >
          Moves
        </button>
        <button 
          className={`tab-btn ${tab === 'abilities' ? 'active' : ''}`}
          onClick={() => setTab('abilities')}
        >
          Abilities
        </button>
        <button 
          className={`tab-btn ${tab === 'evolution' ? 'active' : ''}`}
          onClick={() => setTab('evolution')}
        >
          Evolution
        </button>
      </div>

      <div className="tab-content">
        {tab === 'moves' && pokemon && (
          <div className="moves-list">
            <h3>Move List</h3>
            <div className="scrollable-content">
              {pokemon.moves.slice(0, 20).map((moveInfo, index) => (
                <div key={index} className="move-item">
                  {formatPokemonName(moveInfo.move.name)}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'abilities' && pokemon && (
          <div className="abilities-list">
            <h3>Abilities</h3>
            {pokemon.abilities.map((abilityInfo, index) => (
              <div key={index} className="ability-item">
                <span className="ability-name">
                  {formatPokemonName(abilityInfo.ability.name)}
                </span>
                {abilityInfo.is_hidden && (
                  <span className="hidden-badge">Hidden</span>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'evolution' && evolution && (
          <div className="evolution-chain">
            <h3>Evolution Chain</h3>
            <div className="evolution-list">
              {parseEvolutionChain(evolution.chain).map((name, index, array) => (
                <React.Fragment key={index}>
                  <div className="evolution-stage">
                    {name}
                  </div>
                  {index < array.length - 1 && (
                    <div className="evolution-arrow">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Indicators */}
      <div className="control-indicators">
        <div className="indicator-group">
          <div className="indicator-light green"></div>
          <div className="indicator-light green"></div>
        </div>
        <div className="control-buttons-row">
          <button className="mini-btn green"></button>
          <button className="mini-btn orange"></button>
        </div>
        <div className="speaker-section">
          <div className="mini-arrows">
            <button className="arrow-btn">◄</button>
            <button className="arrow-btn">►</button>
          </div>
          <button className="power-btn">⚡</button>
        </div>
      </div>
    </div>
  );
};

export default TabPanel;
