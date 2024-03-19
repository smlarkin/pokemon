import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { itemWidth } from '../util/constants';

export const PokemonSearch = ({ searchText, setSearchText }) => {
  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <TextInput
        style={styles.textInput}
        returnKeyType="done"
        autoCapitalize="none"
        placeholder="Search Pokémon..."
        placeholderTextColor={'darkgrey'}
        value={searchText}
        onChangeText={setSearchText}
      />

      {searchText ? (
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={() => setSearchText('')}>
          <Text style={styles.closeIconText}>{'X'}</Text>
        </TouchableOpacity>
      ) : null}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: itemWidth,
    height: 64,
  },
  textInput: {
    alignSelf: 'center',
    bottom: 16,
    width: itemWidth,
    borderWidth: 2,
    borderRadius: 50,
    height: 64,
    paddingLeft: 24,
    paddingRight: 6,
    fontSize: 32,
    backgroundColor: 'white',
  },
  closeIconContainer: {
    position: 'absolute',
    right: 24,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
  },
  closeIconText: {
    fontSize: 28,
    color: 'red',
  },
});
