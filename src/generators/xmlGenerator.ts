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
  
  // Prepare attributes
  const attributes = { ...node.attributes };
  if (depth === 0) {
    // Ensure xmlns is first by handling it specially during string generation
    // We don't add it to attributes object to avoid sorting issues, 
    // or we add it and ensure it sorts first.
    // Let's handle it in the sorting logic.
    attributes['xmlns:android'] = 'http://schemas.android.com/apk/res/android';
  }
  
  // precise attribute order
  const getAttrOrder = (key: string): number => {
    if (key === 'xmlns:android') return 0;
    if (key === 'android:id') return 1;
    if (key === 'android:layout_width') return 2;
    if (key === 'android:layout_height') return 3;
    if (key === 'android:orientation') return 4;
    return 10;
  };

  // Build attribute string with sorting
  const attrString = Object.entries(attributes)
    .sort((a, b) => {
      const orderA = getAttrOrder(a[0]);
      const orderB = getAttrOrder(b[0]);
      if (orderA !== orderB) return orderA - orderB;
      return a[0].localeCompare(b[0]);
    })
    .map(([key, value]) => `${key}="${escapeXml(value)}"`)
    .join('\n' + indent + '    ');
  
  // Decide whether to self-close
  const hasChildren = node.children.length > 0;
  // textContent might still be present for some elements if we didn't move it to attribute
  const hasText = !!node.textContent; 
  
  // Opening tag
  let xml = `${indent}<${node.tag}`;
  if (attrString) {
    xml += `\n${indent}    ${attrString}`;
  }
  
  if (!hasChildren && !hasText) {
    xml += '/>';
    return xml;
  }
  
  xml += '>';
  
  // Text content
  if (hasText) {
    xml += `\n${childIndent}${escapeXml(node.textContent!)}`;
  }
  
  // Children
  if (hasChildren) {
    xml += '\n';
    for (const child of node.children) {
      xml += generateElement(child, depth + 1) + '\n';
    }
    xml += indent;
  } else if (hasText) {
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
