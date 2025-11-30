export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
}

export interface Species {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
  genera: Array<{
    genus: string;
    language: {
      name: string;
    };
  }>;
  evolution_chain: {
    url: string;
  };
  capture_rate: number;
  base_happiness: number;
}

export interface EvolutionChain {
  chain: ChainLink;
}

export interface ChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainLink[];
}
