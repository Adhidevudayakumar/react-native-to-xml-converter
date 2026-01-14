import { View, Text } from 'react-native';

export default function Example() {
  return (
    <View style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 18, color: '#ff0000ff' }}>Hello World</Text>
      <View style={{ marginTop: 10 }}>
        <Text>This is a test component</Text>
      </View>
    </View>
  );
}
