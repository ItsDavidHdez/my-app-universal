import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string
}

export default function Task({title}: Props) {
  return (
    <View style={styles.container}>
      {title ? (
        <>
          <Text style={styles.title}>Title: </Text>
          <Text>{title}</Text>
        </>
      ) : <Text style={styles.notTask}>No Tasks yet :C</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  notTask: {
    fontSize: 24,
    fontWeight: "bold"
  },
  title: {
    fontWeight: "bold"
  }
})