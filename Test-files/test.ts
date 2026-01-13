import { parseRN } from "../src/parser/parseRN";
import fs from "fs";
import open from "open";

const code = `
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Hello World</Text>
    </View>
  );
}
`;

const result = parseRN(code);

console.log("Root JSX Element:");
console.log(result);


// Open in Chrome
const openInChrome = async () => { 
  const filePath = "./output.json";
fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
 
await open(filePath, { app: { name: "google chrome" } });
}

openInChrome();