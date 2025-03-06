import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Text, TextInput } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { useSendTask } from '@/hooks/useSendTask';
import { router } from 'expo-router';

export default function AddTask() {
    const [changeText, setChangeText] = useState("")
    const [error, setError] = useState(false)

    const handlerSendTask = () => {
        if(changeText.length > 0) {
            useSendTask(changeText)
            router.navigate("/")
        }

        setError(true)
    }

    useEffect(() => {
        if(error) {
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }, [error])

  return (
    <View style={styles.container}>
        <View>
            <TextInput style={styles.input} placeholder='here add your task' value={changeText} onChangeText={e => setChangeText(e)} />
            <Button title='Send' onPress={handlerSendTask} />

            {error && (
                <Text style={styles.textError}>The field is required!</Text>
            )}
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
  textError: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
  input: {
    borderWidth: .5,
    borderColor: "gray",
    marginVertical: 20,
    borderRadius: 5,
    color: "gray",
    width: 200,
    height: 25,
    padding: 4
  }
});
