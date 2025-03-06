import { Text, View } from 'react-native';

type Props = {
  title: string
}

export default function Task({title}: Props) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
