import { SafeAreaView, StyleSheet } from 'react-native';
import { PokemonList } from './components/PokemonList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PokemonList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
