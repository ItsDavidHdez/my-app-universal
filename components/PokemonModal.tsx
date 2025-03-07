import { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  pokemonUrl: string;
};

export default function PokemonModal({ visible, onClose, pokemonUrl }: Props) {
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && pokemonUrl) {
      setLoading(true);
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then((data) => setPokemonData(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [visible, pokemonUrl]);

  if (!visible) return null;

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            pokemonData && (
              <>
                <Text style={styles.pokemonName}>
                  {pokemonData.name.toUpperCase()}
                </Text>
                <Text>
                  Type(s):
                  {pokemonData.types.map((t: any) => t.type.name).join(", ")}
                </Text>
                <Text>
                  Moves:
                  {pokemonData.moves
                    .slice(0, 2)
                    .map((m: any) => m.move.name)
                    .join(", ")}
                </Text>
                <Button title="Close" onPress={onClose} />
              </>
            )
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
