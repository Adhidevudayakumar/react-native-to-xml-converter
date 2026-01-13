// Converts tree → XML string

import { XMLNode } from '../parser/astTypes';
import { escapeXml } from '../utils/helpers';

/**
 * Generates XML string from XML tree
 */
export function generateXml(root: XMLNode): string {
  const xmlDeclaration = '<?xml version="1.0" encoding="utf-8"?>';
  const rootElement = generateElement(root, 0);
  
  return `${xmlDeclaration}\n${rootElement}`;
}

/**
 * Generates XML element recursively
 */
function generateElement(node: XMLNode, depth: number): string {
  const indent = '    '.repeat(depth);
  const childIndent = '    '.repeat(depth + 1);
  
  // Add xmlns for root element
  const attributes = { ...node.attributes };
  if (depth === 0) {
    attributes['xmlns:android'] = 'http://schemas.android.com/apk/res/android';
  }
  
  // Build attribute string
  const attrString = Object.entries(attributes)
    .map(([key, value]) => `${key}="${escapeXml(value)}"`)
    .join('\n' + indent + '    ');
  
  // Self-closing tag if no children and no text content
  if (node.children.length === 0 && !node.textContent) {
    return `${indent}<${node.tag}\n${indent}    ${attrString} />`;
  }
  
  // Opening tag
  let xml = `${indent}<${node.tag}\n${indent}    ${attrString}>`;
  
  // Text content
  if (node.textContent) {
    xml += `\n${childIndent}${escapeXml(node.textContent)}`;
  }
  
  // Children
  if (node.children.length > 0) {
    xml += '\n';
    for (const child of node.children) {
      xml += generateElement(child, depth + 1) + '\n';
    }
    xml += indent;
  } else if (node.textContent) {
    xml += '\n' + indent;
  }
  
  // Closing tag
  xml += `</${node.tag}>`;
  
  return xml;
}

/**
 * Formats generated XML for better readability
 */
export function formatGeneratedXml(xml: string): string {
  // The XML is already formatted by generateElement
  return xml;
}
