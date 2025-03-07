import { FlatList, StyleSheet, Text, View } from "react-native";

type Props = {
  tasks: string[];
};

export default function Task({ tasks }: Props) {
  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.title}>Title:</Text>
      <Text style={styles.taskItem}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.notTask}>No tasks yet :C</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  listContent: {
    width: "100%",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
  },
  notTask: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
  taskItem: {
    fontSize: 16,
    color: "#333",
  },
});
