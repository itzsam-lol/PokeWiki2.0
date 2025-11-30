import React from 'react';
import './InfoPanel.css';
import { Pokemon, Species } from '../types';
import { formatPokemonName, formatStatName } from '../api/pokewiki';

interface InfoPanelProps {
  pokemon: Pokemon | null;
  species: Species | null;
  tab: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ pokemon, species, tab }) => {
  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      normal: '#A8A878', fire: '#F08030', water: '#6890F0',
      electric: '#F8D030', grass: '#78C850', ice: '#98D8D8',
      fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
      flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
      rock: '#B8A038', ghost: '#705898', dragon: '#7038F8',
      dark: '#705848', steel: '#B8B8D0', fairy: '#EE99AC'
    };
    return colors[type] || '#777';
  };

  const getFlavorText = (): string => {
    if (!species?.flavor_text_entries) return 'No description available.';
    const englishEntry = species.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    return englishEntry?.flavor_text.replace(/\f/g, ' ') || 'No description available.';
  };

  if (!pokemon) {
    return (
      <div className="info-panel">
        <div className="info-panel-screen">
          <p>No Pokemon selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="info-panel">
      <div className="info-panel-screen">
        <h2 className="pokemon-title">{formatPokemonName(pokemon.name)}</h2>
        
        <div className="types-container">
          {pokemon.types.map((typeInfo) => (
            <span 
              key={typeInfo.type.name}
              className="type-badge"
              style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
            >
              {typeInfo.type.name.toUpperCase()}
            </span>
          ))}
        </div>

        {tab === 'summary' && (
          <div className="summary-content">
            <div className="basic-info">
              <div className="info-row">
                <span className="info-label">Height:</span>
                <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
              </div>
              <div className="info-row">
                <span className="info-label">Weight:</span>
                <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
              </div>
            </div>

            <div className="description">
              {getFlavorText()}
            </div>

            <div className="stats-container">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="stat-row">
                  <span className="stat-name">{formatStatName(stat.stat.name)}</span>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
