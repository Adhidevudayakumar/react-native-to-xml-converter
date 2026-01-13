// Utility helper functions

/**
 * Converts camelCase to snake_case
 */
export function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Converts a numeric value to Android dp units
 */
export function toDp(value: number | string): string {
  if (typeof value === 'string') {
    return value; // Already a string, assume it's formatted
  }
  return `${value}dp`;
}

/**
 * Converts a numeric value to Android sp units (for text)
 */
export function toSp(value: number | string): string {
  if (typeof value === 'string') {
    return value;
  }
  return `${value}sp`;
}

/**
 * Generates a unique Android view ID
 */
let idCounter = 0;
export function generateId(prefix: string = 'view'): string {
  return `@+id/${prefix}_${++idCounter}`;
}

/**
 * Resets the ID counter (useful for testing)
 */
export function resetIdCounter(): void {
  idCounter = 0;
}

/**
 * Converts hex color to Android color format
 */
export function convertColor(color: string): string {
  // If it's already a hex color, ensure it has # prefix
  if (color.startsWith('#')) {
    return color;
  }
  
  // Handle named colors (basic support)
  const namedColors: Record<string, string> = {
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#FF0000',
    'green': '#00FF00',
    'blue': '#0000FF',
    'transparent': '#00000000',
  };
  
  return namedColors[color.toLowerCase()] || color;
}

/**
 * Escapes special XML characters in text content
 */
export function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Formats XML with proper indentation
 */
export function formatXml(xml: string, indentLevel: number = 0): string {
  const indent = '  '.repeat(indentLevel);
  return xml
    .split('\n')
    .map(line => line.trim() ? indent + line : '')
    .join('\n');
}
