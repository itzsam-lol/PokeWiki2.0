import React from 'react';
import './PokemonScreen.css';
import { Pokemon } from '../types';
import { formatPokemonName } from '../api/pokewiki';

interface PokemonScreenProps {
  pokemon: Pokemon | null;
  loading: boolean;
  isShiny: boolean;
}

const PokemonScreen: React.FC<PokemonScreenProps> = ({ pokemon, loading, isShiny }) => {
  const getSprite = () => {
    if (!pokemon) return '';
    if (isShiny) {
      return pokemon.sprites.other['official-artwork'].front_shiny || pokemon.sprites.front_shiny;
    }
    return pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  };

  return (
    <div className="pokemon-screen-container">
      <div className="screen-border">
        <div className="screen-content">
          {loading ? (
            <div className="loading-screen">
              <div className="pokeball-loader"></div>
              <p>Loading...</p>
            </div>
          ) : pokemon ? (
            <>
              <div className="pokemon-image-container">
                <img 
                  src={getSprite()} 
                  alt={pokemon.name}
                  className="pokemon-image"
                />
                {isShiny && <div className="shiny-indicator">★</div>}
              </div>
              <div className="pokemon-info-bar">
                <span className="pokemon-name">{formatPokemonName(pokemon.name)}</span>
                <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
              </div>
            </>
          ) : (
            <div className="no-pokemon">No Pokemon loaded</div>
          )}
        </div>
      </div>
      <div className="screen-speaker">
        <div className="speaker-line"></div>
        <div className="speaker-line"></div>
        <div className="speaker-line"></div>
        <div className="speaker-line"></div>
      </div>
      <div className="screen-dots">
        <div className="red-dot"></div>
        <div className="red-dot"></div>
      </div>
    </div>
  );
};

export default PokemonScreen;
