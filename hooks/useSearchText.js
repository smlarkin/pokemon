import { useMemo } from 'react';

export const useSearchText = (pokemonData, searchText) => {
  const searchResults = useMemo(() => {
    if (searchText) {
      const searchTextPrepared = searchText.toLowerCase().trim();

      const filteredPokeman = pokemonData.filter((pokemon) => {
        return (
          pokemon?.nickname?.includes?.(searchTextPrepared) ||
          pokemon.name.includes(searchTextPrepared)
        );
      });

      const dedupedPokemon = filteredPokeman.reduce((pokemonList, pokemon) => {
        if (!pokemonList.find((p) => p.name === pokemon.name)) {
          return [...pokemonList, pokemon];
        }
        return pokemonList;
      }, []);

      const sortedPokemon = dedupedPokemon.sort((a, b) => {
        if (a.nickname && b.nickname) {
          return 0;
        } else if (a.nickname) {
          return -1;
        } else if (b.nickname) {
          return 1;
        }
      });

      return sortedPokemon;
    } else {
      return pokemonData;
    }
  }, [pokemonData, searchText]);

  return searchResults;
};
