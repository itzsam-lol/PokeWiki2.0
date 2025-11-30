import { Pokemon, Species, EvolutionChain } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemon(idOrName: string | number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  if (!response.ok) {
    throw new Error('Pokemon not found');
  }
  return response.json();
}

export async function fetchSpecies(id: number): Promise<Species> {
  const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!response.ok) {
    throw new Error('Species not found');
  }
  return response.json();
}

export async function fetchEvolutionChain(id: number): Promise<EvolutionChain> {
  const response = await fetch(`${BASE_URL}/evolution-chain/${id}`);
  if (!response.ok) {
    throw new Error('Evolution chain not found');
  }
  return response.json();
}

export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
}

export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatStatName(name: string): string {
  const statNames: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  };
  return statNames[name] || name;
}
