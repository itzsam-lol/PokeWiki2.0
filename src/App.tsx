import React, { useState, useEffect } from 'react';
import './App.css';
import PokedexShell from './components/PokedexShell';
import { fetchPokemon, fetchSpecies, fetchEvolutionChain } from './api/pokewiki';
import { Pokemon, Species, EvolutionChain } from './types';

function App() {
  const [currentId, setCurrentId] = useState<number>(1);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<Species | null>(null);
  const [evolution, setEvolution] = useState<EvolutionChain | null>(null);
  const [tab, setTab] = useState<'summary' | 'moves' | 'abilities' | 'evolution'>('summary');
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<number[]>([1]);
  const [isShiny, setIsShiny] = useState<boolean>(false);

  useEffect(() => {
    loadPokemon(currentId);
  }, [currentId]);

  const loadPokemon = async (id: number) => {
    setLoading(true);
    try {
      const pokemonData = await fetchPokemon(id);
      const speciesData = await fetchSpecies(id);
      setPokemon(pokemonData);
      setSpecies(speciesData);
      
      // Load evolution chain
      if (speciesData?.evolution_chain?.url) {
        const chainId = speciesData.evolution_chain.url.split('/').slice(-2, -1)[0];
        const evolutionData = await fetchEvolutionChain(parseInt(chainId));
        setEvolution(evolutionData);
      }
    } catch (error) {
      console.error('Error loading Pokemon:', error);
    }
    setLoading(false);
  };

  const navigate = (direction: 'next' | 'prev') => {
    const newId = direction === 'next' 
      ? Math.min(currentId + 1, 1010) 
      : Math.max(currentId - 1, 1);
    
    if (newId !== currentId) {
      setHistory([...history, currentId]);
      setCurrentId(newId);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      const previousId = newHistory.pop()!;
      setHistory(newHistory);
      setCurrentId(previousId);
    }
  };

  const randomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    setHistory([...history, currentId]);
    setCurrentId(randomId);
  };

  const searchPokemon = (query: string) => {
    const id = parseInt(query);
    if (!isNaN(id) && id > 0 && id <= 1010) {
      setHistory([...history, currentId]);
      setCurrentId(id);
    } else {
      // Search by name
      setLoading(true);
      fetchPokemon(query.toLowerCase())
        .then((data) => {
          setHistory([...history, currentId]);
          setCurrentId(data.id);
        })
        .catch((error) => {
          console.error('Pokemon not found:', error);
          alert('Pokemon not found! Try another name or ID.');
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="App">
      <PokedexShell
        pokemon={pokemon}
        species={species}
        evolution={evolution}
        currentId={currentId}
        tab={tab}
        setTab={setTab}
        navigate={navigate}
        goBack={goBack}
        loading={loading}
        randomPokemon={randomPokemon}
        searchPokemon={searchPokemon}
        isShiny={isShiny}
        setIsShiny={setIsShiny}
      />
    </div>
  );
}

export default App;
