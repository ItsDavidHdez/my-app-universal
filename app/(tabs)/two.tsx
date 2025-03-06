import { ScrollView, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { useGetPokemons } from '@/hooks/useGetPokemons';

export default function TabTwoScreen() {
  const [pokemons, setPokemons] = useState([])

    useEffect(() => {
      useGetPokemons(setPokemons)
    }, [])

  return (
    <ScrollView>
      {pokemons.map((pokemon) => (
        <Text style={styles.title}>{pokemon.name}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
