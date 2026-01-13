# React Native to XML Converter

A powerful CLI tool that converts React Native components to Android XML layouts. This tool parses your React Native JSX/TSX files and generates corresponding Android XML layout files, making it easy to port React Native components to native Android.

## Features

- 🔄 **Automatic Conversion**: Converts React Native components to Android XML
- 🎨 **Style Mapping**: Maps React Native styles to Android attributes
- 📦 **Component Support**: Supports common RN components (View, Text, ScrollView, etc.)
- 🚀 **CLI Tool**: Easy-to-use command-line interface
- 📁 **Organized Output**: Generates XML files in a dedicated `xml/` folder
- ✨ **TypeScript Support**: Written in TypeScript with full type definitions

## Installation

### Global Installation`
```bash
npm install -g react-native-to-xml-converter
```

### Local Installation
```bash
npm install --save-dev react-native-to-xml-converter
```

### Using npx (No Installation Required)
```bash
npx react-native-to-xml-converter <input-file>
```

## Usage

### Basic Usage
```bash
# Using installed package
rn-to-xml example.ts

# Using npx
npx rn-to-xml example.ts
```

The converted XML file will be saved in the `xml/` folder in your current directory.

### Example

**Input (example.ts):**
```tsx
import { View, Text } from 'react-native';

export default function Example() {
  return (
    <View style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 18, color: '#333' }}>Hello World</Text>
      <View style={{ marginTop: 10 }}>
        <Text>This is a test component</Text>
      </View>
    </View>
  );
}
```

**Output (xml/example.xml):**
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android:padding="20dp"
    android:background="#f0f0f0"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:id="@+id/view_1"
    xmlns:android="http://schemas.android.com/apk/res/android">
    <TextView
        android:textSize="18sp"
        android:textColor="#333"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/text_2">
        Hello World
    </TextView>
    <LinearLayout
        android:layout_marginTop="10dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:id="@+id/view_3">
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/text_4">
            This is a test component
        </TextView>
    </LinearLayout>
</LinearLayout>
```

## Supported Components

| React Native | Android XML |
|-------------|-------------|
| `View` | `LinearLayout` |
| `Text` | `TextView` |
| `Image` | `ImageView` |
| `ScrollView` | `ScrollView` |
| `TextInput` | `EditText` |
| `Button` | `Button` |
| `TouchableOpacity` | `FrameLayout` |
| `FlatList` | `RecyclerView` |

## Supported Styles

### Layout Properties
- `padding`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`
- `paddingHorizontal`, `paddingVertical`
- `margin`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`
- `marginHorizontal`, `marginVertical`
- `width`, `height`

### View Properties
- `backgroundColor`
- `flexDirection` (determines layout orientation)
- `alignItems`, `justifyContent` (converted to gravity)

### Text Properties
- `fontSize`
- `color`
- `fontWeight`
- `textAlign`

## Programmatic API

You can also use this package programmatically in your Node.js scripts:

```typescript
import { convertRNToXML } from 'react-native-to-xml-converter';

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

const xml = convertRNToXML(code);
console.log(xml);
```

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/Adhidevudayakumar/react-native-to-xml-converter.git
cd react-native-to-xml-converter

# Install dependencies
npm install

# Build the project
npm run build

# Link locally for testing
npm link

# Test the CLI
npx rn-to-xml example.ts
```

### Project Structure

```
├── src/
│   ├── cli/           # CLI entry point
│   ├── parser/        # AST parsing logic
│   ├── transformer/   # Component and style mappers
│   ├── generators/    # XML generation
│   ├── utils/         # Helper utilities
│   └── index.ts       # Public API
├── dist/              # Compiled output
├── xml/               # Generated XML files (created on first run)
└── package.json
```

## Limitations

- Only supports inline styles (not StyleSheet.create references yet)
- Some complex React Native components may not have direct Android equivalents
- Nested Text components are flattened to single TextView
- Custom components are treated as View by default

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Adhidev Udayakumar

## Links

- [GitHub Repository](https://github.com/Adhidevudayakumar/react-native-to-xml-converter)
- [Report Issues](https://github.com/Adhidevudayakumar/react-native-to-xml-converter/issues)
