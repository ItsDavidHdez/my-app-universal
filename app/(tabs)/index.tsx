import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import Task from '@/components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const [data, setData] = useState("")

  const handlerGetTask = async () => {
    const jsonValue = await AsyncStorage.getItem('tasks');
    return setData(jsonValue != null ? JSON.parse(jsonValue) : null);
  }

  useEffect(() => {
    handlerGetTask()
  }, [])
  return (
    <View style={styles.container}>
      <Link style={styles.button} href="/addtask">Add your task</Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Task title={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  button: {
    backgroundColor: "green",
    width: 120,
    height: 25,
    textAlign: "center",
    alignContent: "center",
    color: "#fff",
    marginTop: 20,
    borderRadius: 5
  }
});
