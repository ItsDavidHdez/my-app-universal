import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useGetPokemons } from "@/hooks/useGetPokemons";
import PokemonModal from "@/components/PokemonModal";
import { API } from "@/constants/api";

export default function TabTwoScreen() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const { pokemons, loading, totalPages } = useGetPokemons(page);

  const handleSearch = async () => {
    if (!search) return;

    try {
      const response = await fetch(`${API}/pokemon/${search.toLowerCase()}`);

      if (!response.ok) {
        console.log("Error", "Pokémon not found");
        return;
      }

      const data = await response.json();
      setSelectedPokemon(data.species.url);
    } catch (error) {
      console.error("Pokemon not found:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon by number"
        keyboardType="numeric"
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedPokemon(item.url)}
              style={styles.pokemonItem}
            >
              <Text style={styles.pokemonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.pagination}>
        <Button
          title="Previous"
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        />
        <Text>
          Page {page} of {totalPages}
        </Text>
        <Button
          title="Next"
          onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
        />
      </View>
      <PokemonModal
        visible={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        pokemonUrl={selectedPokemon || ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginVertical: 10,
    width: "80%",
    borderRadius: 5,
  },
  pokemonItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
  },
  pokemonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
});
