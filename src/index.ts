// Main public API entry

import { parseRN } from './parser/parseRN';
import { buildXmlTree } from './transformer/layoutBuilder';
import { generateXml } from './generators/xmlGenerator';
import { resetIdCounter } from './utils/helpers';

/**
 * Converts React Native code to Android XML layout
 * @param code - React Native component code (JSX/TSX)
 * @returns Android XML layout string
 */
export function convertRNToXML(code: string): string {
  try {
    // Reset ID counter for each conversion
    resetIdCounter();
    
    // Parse React Native code
    const { rootJSXElement } = parseRN(code);
    
    // Build XML tree
    const xmlTree = buildXmlTree(rootJSXElement);
    
    // Generate XML string
    const xml = generateXml(xmlTree);
    
    return xml;
  } catch (error) {
    throw new Error(`Conversion failed: ${(error as Error).message}`);
  }
}

// Export types for library users
export type { XMLNode, ConvertedStyles, ComponentMapping } from './parser/astTypes';
export type { ParsedRNTree } from './parser/parseRN';
