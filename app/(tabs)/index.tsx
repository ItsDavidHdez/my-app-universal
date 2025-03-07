import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import Task from "@/components/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
  const [data, setData] = useState<string[]>([]);

  const handlerGetTask = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("tasks");
      setData(jsonValue ? JSON.parse(jsonValue) : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    handlerGetTask();
  }, [handlerGetTask]);

  return (
    <View style={styles.container}>
      <Link style={styles.button} href="/addtask">
        Add your task
      </Link>
      <Task tasks={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: "green",
    width: 120,
    height: 25,
    textAlign: "center",
    alignContent: "center",
    color: "#fff",
    marginTop: 20,
    borderRadius: 5,
    paddingVertical: 2,
  },
  noTasks: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
});
