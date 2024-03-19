import { useCallback, useEffect, useState } from 'react';

export const usePokemonData = (pokeLimit = 0) => {
  const [pokemonData, setPokemonData] = useState([]);

  const [nextUrl, setNextUrl] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const fetchPokemonData = useCallback(
    async (limit) => {
      const address =
        typeof limit === 'number' // NOTE 0 sets 20 items as the default
          ? `https://pokeapi.co/api/v2/pokemon/${
              limit ? '?limit=' + limit : ''
            }`
          : nextUrl;

      if (address) {
        setLoading(true);

        try {
          const response = await fetch(address);

          const data = await response.json();

          const { next, results } = data;

          setNextUrl(next);

          setPokemonData((previousPokemon) => [...previousPokemon, ...results]);
        } catch (error) {
          console.error(error);

          setError(error);
        } finally {
          setLoading(false);
        }
      }
    },
    [nextUrl],
  );

  useEffect(() => {
    fetchPokemonData(pokeLimit);
  }, [fetchPokemonData, pokeLimit]);

  return {
    pokemonData,
    setPokemonData,
    refetchPokemonData: fetchPokemonData,
    loading,
    error,
  };
};
