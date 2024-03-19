import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { itemWidth, width } from '../util/constants';

export const PokemonDetailsModal = ({
  selectedPokemon,
  setSelectedPokemon,
  setPokemonData,
}) => {
  const [loading, setLoading] = useState(false);

  const [pokemonDetailsData, setPokemonDetailsData] = useState(null);

  const [displayName, setDisplayName] = useState('');

  const hasNickname = selectedPokemon?.name !== displayName;

  useEffect(() => {
    if (selectedPokemon) {
      const nickname = selectedPokemon?.nickname || '';

      const name = selectedPokemon.name;

      const url = selectedPokemon.url;

      const image = `https://img.pokemondb.net/artwork/${name}.jpg`;

      setLoading(true);

      (async () => {
        try {
          const response = await fetch(url);

          const data = await response.json();

          const { height, weight, types } = data;

          setPokemonDetailsData({
            name,
            nickname,
            image,
            height,
            weight,
            types,
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);

          setDisplayName(nickname || name);
        }
      })();
    }

    return () => setPokemonDetailsData(null);
  }, [selectedPokemon]);

  const handleOnBlur = useCallback(() => {
    if (displayName !== selectedPokemon.name) {
      setPokemonData((previousPokemonData) => {
        return previousPokemonData.map((pokemon) => {
          if (pokemon.name === selectedPokemon.name) {
            return {
              ...pokemon,
              nickname: displayName,
            };
          }
          return pokemon;
        });
      });
    }
  }, [displayName, selectedPokemon, setPokemonData]);

  return (
    <Modal animationType="slide" visible={!!selectedPokemon}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{'Pokémon Details'}</Text>

          <TouchableOpacity onPress={() => setSelectedPokemon(null)}>
            <Text style={styles.headerCloseIconText}>{'X'}</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator style={styles.activityIndicator} />
        ) : null}

        {pokemonDetailsData ? (
          <ScrollView
            style={styles.contentContainer}
            contentContainerStyle={styles.contentContainerStyle}>
            <Image
              style={styles.image}
              source={{
                uri: pokemonDetailsData.image,
              }}
            />

            <Text style={styles.textLabel}>
              {hasNickname ? 'Display Name' : 'Name'}
            </Text>

            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              returnKeyType="done"
              onBlur={handleOnBlur}
              value={displayName}
              onChangeText={setDisplayName}
            />

            {hasNickname ? (
              <>
                <Text style={styles.textLabel}>{'Original Name'}</Text>

                <Text style={styles.textValue}>{pokemonDetailsData.name}</Text>
              </>
            ) : null}

            <Text style={styles.textLabel}>{'Height'}</Text>

            <Text style={styles.textValue}>{pokemonDetailsData.height}</Text>

            <Text style={styles.textLabel}>{'Weight'}</Text>

            <Text style={styles.textValue}>{pokemonDetailsData.weight}</Text>

            <Text style={styles.textLabel}>{'Types'}</Text>

            <Text style={styles.textValue}>
              {pokemonDetailsData.types.map(({ type }) => type.name).join(', ')}
            </Text>
          </ScrollView>
        ) : null}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
  },
  headerCloseIconText: {
    fontSize: 24,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  contentContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    width: itemWidth,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    alignSelf: 'center',
    width: itemWidth - 32,
    height: itemWidth - 32,
    resizeMode: 'contain',
  },
  textInput: {
    width: '100%',
    height: 32,
    fontSize: 32,
    marginBottom: 24,
    borderBottomWidth: 1,
  },
  textLabel: {
    fontSize: 16,
    color: 'red',
  },
  textValue: {
    fontSize: 32,
    marginBottom: 24,
  },
});
