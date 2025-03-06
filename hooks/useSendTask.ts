import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSendTask = async (value: string) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('tasks', jsonValue);
        console.log(jsonValue);
    } catch (e) {
        console.log("Error: ", e)
    }
}