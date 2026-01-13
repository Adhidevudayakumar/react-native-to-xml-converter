// Converts RN styles → Android attrs

import { ConvertedStyles } from '../parser/astTypes';
import { toDp, toSp, convertColor } from '../utils/helpers';

/**
 * Maps React Native style properties to Android XML attributes
 */
export function mapStyles(style: any): ConvertedStyles {
  const result: ConvertedStyles = {
    layout: {},
    view: {},
    text: {},
  };

  if (!style || typeof style !== 'object') {
    return result;
  }

  // Layout properties
  if (style.padding !== undefined) {
    result.layout['android:padding'] = toDp(style.padding);
  }
  if (style.paddingTop !== undefined) {
    result.layout['android:paddingTop'] = toDp(style.paddingTop);
  }
  if (style.paddingBottom !== undefined) {
    result.layout['android:paddingBottom'] = toDp(style.paddingBottom);
  }
  if (style.paddingLeft !== undefined) {
    result.layout['android:paddingLeft'] = toDp(style.paddingLeft);
  }
  if (style.paddingRight !== undefined) {
    result.layout['android:paddingRight'] = toDp(style.paddingRight);
  }
  if (style.paddingHorizontal !== undefined) {
    result.layout['android:paddingLeft'] = toDp(style.paddingHorizontal);
    result.layout['android:paddingRight'] = toDp(style.paddingHorizontal);
  }
  if (style.paddingVertical !== undefined) {
    result.layout['android:paddingTop'] = toDp(style.paddingVertical);
    result.layout['android:paddingBottom'] = toDp(style.paddingVertical);
  }

  if (style.margin !== undefined) {
    result.layout['android:layout_margin'] = toDp(style.margin);
  }
  if (style.marginTop !== undefined) {
    result.layout['android:layout_marginTop'] = toDp(style.marginTop);
  }
  if (style.marginBottom !== undefined) {
    result.layout['android:layout_marginBottom'] = toDp(style.marginBottom);
  }
  if (style.marginLeft !== undefined) {
    result.layout['android:layout_marginLeft'] = toDp(style.marginLeft);
  }
  if (style.marginRight !== undefined) {
    result.layout['android:layout_marginRight'] = toDp(style.marginRight);
  }
  if (style.marginHorizontal !== undefined) {
    result.layout['android:layout_marginLeft'] = toDp(style.marginHorizontal);
    result.layout['android:layout_marginRight'] = toDp(style.marginHorizontal);
  }
  if (style.marginVertical !== undefined) {
    result.layout['android:layout_marginTop'] = toDp(style.marginVertical);
    result.layout['android:layout_marginBottom'] = toDp(style.marginVertical);
  }

  // Width and Height
  if (style.width !== undefined) {
    if (style.width === '100%') {
      result.layout['android:layout_width'] = 'match_parent';
    } else {
      result.layout['android:layout_width'] = toDp(style.width);
    }
  }
  if (style.height !== undefined) {
    if (style.height === '100%') {
      result.layout['android:layout_height'] = 'match_parent';
    } else {
      result.layout['android:layout_height'] = toDp(style.height);
    }
  }

  // View properties
  if (style.backgroundColor !== undefined) {
    result.view['android:background'] = convertColor(style.backgroundColor);
  }

  // Text properties
  if (style.fontSize !== undefined) {
    result.text['android:textSize'] = toSp(style.fontSize);
  }
  if (style.color !== undefined) {
    result.text['android:textColor'] = convertColor(style.color);
  }
  if (style.fontWeight !== undefined) {
    if (style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 600) {
      result.text['android:textStyle'] = 'bold';
    }
  }
  if (style.textAlign !== undefined) {
    const alignment: Record<string, string> = {
      'left': 'left',
      'center': 'center',
      'right': 'right',
      'justify': 'justify',
    };
    result.text['android:textAlignment'] = alignment[style.textAlign] || 'left';
  }

  // Flex properties (basic support)
  if (style.flexDirection !== undefined) {
    // This will be handled at the layout level in layoutBuilder
  }
  if (style.alignItems !== undefined) {
    const gravity: Record<string, string> = {
      'flex-start': 'start',
      'flex-end': 'end',
      'center': 'center',
      'stretch': 'fill',
    };
    result.view['android:gravity'] = gravity[style.alignItems] || 'start';
  }
  if (style.justifyContent !== undefined) {
    const gravity: Record<string, string> = {
      'flex-start': 'start',
      'flex-end': 'end',
      'center': 'center',
      'space-between': 'space_between',
      'space-around': 'space_around',
    };
    const currentGravity = result.view['android:gravity'] || '';
    const justifyGravity = gravity[style.justifyContent] || 'start';
    result.view['android:gravity'] = currentGravity 
      ? `${currentGravity}|${justifyGravity}` 
      : justifyGravity;
  }

  return result;
}

/**
 * Extracts inline styles from JSX element
 */
export function extractInlineStyles(styleValue: any): any {
  if (!styleValue) {
    return {};
  }

  // Handle object expression (inline styles)
  if (typeof styleValue === 'object') {
    return styleValue;
  }

  // For now, we'll just return empty object for other cases
  // In a full implementation, you'd resolve StyleSheet.create references
  return {};
}
