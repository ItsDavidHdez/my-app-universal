import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useSendTask } from '@/hooks/useSendTask';

export default function AddTask() {
    const [changeText, setChangeText] = useState("")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add your task!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View>
            <TextInput placeholder='here add your task' value={changeText} onChangeText={e => setChangeText(e)} />
            <Button title='Send' onPress={() => useSendTask(changeText)} />
        </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
    marginTop: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
