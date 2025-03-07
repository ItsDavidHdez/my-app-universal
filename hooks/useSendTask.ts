import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSendTask = async (value: string) => {
  try {
    const storedTasks = await AsyncStorage.getItem("tasks");
    const tasksArray = storedTasks ? JSON.parse(storedTasks) : [];

    tasksArray.push(value);

    await AsyncStorage.setItem("tasks", JSON.stringify(tasksArray));
  } catch (e) {
    console.log("Error: ", e);
  }
};
