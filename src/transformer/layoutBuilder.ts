// Builds final XML tree

import * as t from '@babel/types';
import { XMLNode } from '../parser/astTypes';
import { mapComponentToXml, canHaveChildren, getOrientation } from './rnNodeMapper';
import { mapStyles, extractInlineStyles } from './styleMapper';
import { generateId } from '../utils/helpers';

/**
 * Builds an XML tree from a JSX element
 */
export function buildXmlTree(jsxElement: t.JSXElement): XMLNode {
  const elementName = getElementName(jsxElement.openingElement);
  const xmlTag = mapComponentToXml(elementName);
  
  // Extract attributes and styles
  const { attributes, styles } = extractAttributes(jsxElement.openingElement);
  
  // Map styles to Android attributes
  const convertedStyles = mapStyles(styles);
  
  // Merge all attributes
  const allAttributes: Record<string, string> = {
    ...attributes,
    ...convertedStyles.layout,
    ...convertedStyles.view,
    ...convertedStyles.text,
  };
  
  // Add default layout attributes if not present
  if (!allAttributes['android:layout_width']) {
    allAttributes['android:layout_width'] = 'wrap_content';
  }
  if (!allAttributes['android:layout_height']) {
    allAttributes['android:layout_height'] = 'wrap_content';
  }
  
  // Add orientation for layouts
  if (xmlTag === 'LinearLayout' && !allAttributes['android:orientation']) {
    const orientation = getOrientation(styles?.flexDirection);
    allAttributes['android:orientation'] = orientation;
  }
  
  // Generate ID
  allAttributes['android:id'] = generateId(elementName.toLowerCase());
  
  // Build children and extract text content
  const children: XMLNode[] = [];
  let textContent: string | undefined;
  
  // Always process children to extract text content
  for (const child of jsxElement.children) {
    if (t.isJSXElement(child)) {
      // Only add as child if the component can have children
      if (canHaveChildren(elementName)) {
        children.push(buildXmlTree(child));
      }
    } else if (t.isJSXText(child)) {
      const text = child.value.trim();
      if (text) {
        textContent = text;
      }
    } else if (t.isJSXExpressionContainer(child)) {
      // Handle expressions like {variable}
      if (t.isStringLiteral(child.expression)) {
        textContent = child.expression.value;
      } else {
        // For other expressions, use placeholder
        textContent = '{expression}';
      }
    }
  }
  
  return {
    tag: xmlTag,
    attributes: allAttributes,
    children,
    textContent,
  };
}

/**
 * Gets the element name from JSX opening element
 */
function getElementName(openingElement: t.JSXOpeningElement): string {
  const name = openingElement.name;
  if (t.isJSXIdentifier(name)) {
    return name.name;
  }
  return 'View';
}

/**
 * Extracts attributes and styles from JSX opening element
 */
function extractAttributes(openingElement: t.JSXOpeningElement): {
  attributes: Record<string, string>;
  styles: any;
} {
  const attributes: Record<string, string> = {};
  let styles: any = {};
  
  for (const attr of openingElement.attributes) {
    if (t.isJSXAttribute(attr)) {
      const attrName = t.isJSXIdentifier(attr.name) ? attr.name.name : '';
      
      if (attrName === 'style') {
        styles = extractStyleValue(attr.value);
      } else if (attrName === 'testID') {
        // Map testID to contentDescription
        const value = extractAttributeValue(attr.value);
        if (value) {
          attributes['android:contentDescription'] = value;
        }
      } else {
        // Other attributes - map directly
        const value = extractAttributeValue(attr.value);
        if (value) {
          attributes[attrName] = value;
        }
      }
    }
  }
  
  return { attributes, styles };
}

/**
 * Extracts the value from JSX attribute value
 */
function extractAttributeValue(value: t.JSXAttribute['value']): string | null {
  if (t.isStringLiteral(value)) {
    return value.value;
  }
  if (t.isJSXExpressionContainer(value)) {
    if (t.isStringLiteral(value.expression)) {
      return value.expression.value;
    }
    if (t.isNumericLiteral(value.expression)) {
      return value.expression.value.toString();
    }
    if (t.isBooleanLiteral(value.expression)) {
      return value.expression.value.toString();
    }
  }
  return null;
}

/**
 * Extracts style object from JSX attribute value
 */
function extractStyleValue(value: t.JSXAttribute['value']): any {
  if (t.isJSXExpressionContainer(value)) {
    if (t.isObjectExpression(value.expression)) {
      // Parse inline style object
      const styleObj: any = {};
      for (const prop of value.expression.properties) {
        if (t.isObjectProperty(prop)) {
          const key = t.isIdentifier(prop.key) ? prop.key.name : '';
          let val: any;
          
          if (t.isNumericLiteral(prop.value)) {
            val = prop.value.value;
          } else if (t.isStringLiteral(prop.value)) {
            val = prop.value.value;
          }
          
          if (key && val !== undefined) {
            styleObj[key] = val;
          }
        }
      }
      return styleObj;
    }
  }
  return {};
}
