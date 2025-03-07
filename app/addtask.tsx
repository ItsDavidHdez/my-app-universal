import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, Text, TextInput } from "react-native";
import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AddTask() {
  const [changeText, setChangeText] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const handlerSendTask = async () => {
    if (changeText.length > 0) {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        const tasksArray = storedTasks ? JSON.parse(storedTasks) : [];

        const updatedTasks = [...tasksArray, changeText];

        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

        setTasks(updatedTasks);
        setChangeText("");

        router.navigate("/");
      } catch (e) {
        console.log("Error al guardar la tarea:", e);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.log("Error al cargar las tareas:", e);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Add your task"
        value={changeText}
        onChangeText={setChangeText}
      />
      <Button title="Send" onPress={handlerSendTask} />

      {error && <Text style={styles.textError}>The field is required!</Text>}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textError: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "gray",
    marginVertical: 10,
    borderRadius: 5,
    color: "gray",
    width: 200,
    height: 30,
    paddingHorizontal: 5,
  },
  taskItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  noTasks: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
});
