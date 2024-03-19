import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { width, height, itemWidth } from '../util/constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PokemonSearch } from './PokemonSearch';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchText } from '../hooks/useSearchText';
import { PokemonDetailsModal } from './PokemonDetailsModal';
import { usePokemonData } from '../hooks/usePokemonData';

export const PokemonList = () => {
  const flatRef = useRef(null);

  const scrollToTop = useCallback(
    () => flatRef?.current?.scrollToOffset({ offset: 0 }),
    [],
  );

  const [searchText, setSearchText] = useState('');

  const searchTextDebounced = useDebounce(searchText, 200);

  const { pokemonData, setPokemonData, refetchPokemonData, loading } =
    usePokemonData(151);

  const pokemonListData = useSearchText(pokemonData, searchTextDebounced);

  useEffect(() => {
    if (searchText.length) {
      scrollToTop();
    }
  }, [searchText.length, scrollToTop]);

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{'Pokémon List'}</Text>

        <PokemonSearch {...{ searchText, setSearchText }} />
      </View>

      <FlatList
        ref={flatRef}
        style={styles.contentContainer}
        contentContainerStyle={styles.contentContainerStyle}
        data={pokemonListData}
        ListEmptyComponent={
          <ActivityIndicator size="large" style={styles.activityIndicator} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.renderItemContainer}
            onPress={() => setSelectedPokemon(item)}>
            <Text style={styles.renderItemText}>
              {item?.nickname || item.name}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={<View style={styles.itemSeparatorComponent} />}
        onEndReached={() => {
          if (!searchText) refetchPokemonData();
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            {loading ? <ActivityIndicator size="large" color="red" /> : null}
          </View>
        }
      />

      <PokemonDetailsModal
        {...{ selectedPokemon, setSelectedPokemon, setPokemonData }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 36,
    color: 'red',
    marginBottom: 32,
  },
  contentContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    width,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: height - 128,
  },
  renderItemContainer: {
    width: itemWidth,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 16,
  },
  renderItemText: {
    fontSize: 32,
  },
  itemSeparatorComponent: {
    width: itemWidth,
    height: 1,
    borderTopWidth: 1,
    marginVertical: 8,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: -48,
  },
});
