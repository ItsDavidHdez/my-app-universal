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
      <Text style={styles.title}>Task list</Text>
      <Link href="/addtask">Add your task</Link>
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
});
