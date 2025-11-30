import React, { useState } from 'react';
import './PokedexShell.css';
import PokemonScreen from './PokemonScreen';
import ControlPad from './ControlPad';
import InfoPanel from './InfoPanel';
import TabPanel from './TabPanel';
import SearchModal from './SearchModal';
import { Pokemon, Species, EvolutionChain } from '../types';

interface PokedexShellProps {
  pokemon: Pokemon | null;
  species: Species | null;
  evolution: EvolutionChain | null;
  currentId: number;
  tab: 'summary' | 'moves' | 'abilities' | 'evolution';
  setTab: (tab: 'summary' | 'moves' | 'abilities' | 'evolution') => void;
  navigate: (direction: 'next' | 'prev') => void;
  goBack: () => void;
  loading: boolean;
  randomPokemon: () => void;
  searchPokemon: (query: string) => void;
  isShiny: boolean;
  setIsShiny: (shiny: boolean) => void;
}

const PokedexShell: React.FC<PokedexShellProps> = ({
  pokemon,
  species,
  evolution,
  currentId,
  tab,
  setTab,
  navigate,
  goBack,
  loading,
  randomPokemon,
  searchPokemon,
  isShiny,
  setIsShiny
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="pokedex-shell">
      {/* Pokemon Logo Header */}
      <div className="pokewiki-header">
        <img src="/pokelogo.png" alt="Pokemon Logo" className="pokemon-logo" />
        <h1 className="pokewiki-title">PokeWiki 2.0</h1>
      </div>

      <div className="pokedex-container">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="top-indicators">
            <div className="big-light"></div>
            <div className="small-lights">
              <div className="small-light red"></div>
              <div className="small-light yellow"></div>
              <div className="small-light green"></div>
            </div>
          </div>
          
          <PokemonScreen 
            pokemon={pokemon} 
            loading={loading}
            isShiny={isShiny}
          />
          
          <ControlPad
            navigate={navigate}
            goBack={goBack}
            randomPokemon={randomPokemon}
            onSearch={() => setShowSearch(true)}
            setIsShiny={setIsShiny}
            isShiny={isShiny}
          />
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <InfoPanel 
            pokemon={pokemon}
            species={species}
            tab={tab}
          />
          
          <TabPanel
            pokemon={pokemon}
            species={species}
            evolution={evolution}
            tab={tab}
            setTab={setTab}
          />
        </div>
      </div>

      {/* GitHub Logo Link */}
      <a 
        href="https://github.com/itzsam-lol/PokeWiki2.0" 
        target="_blank" 
        rel="noopener noreferrer"
        className="github-link"
        title="View on GitHub"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" className="github-icon">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>

      {showSearch && (
        <SearchModal
          onClose={() => setShowSearch(false)}
          onSearch={(query) => {
            searchPokemon(query);
            setShowSearch(false);
          }}
        />
      )}
    </div>
  );
};

export default PokedexShell;
