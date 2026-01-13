// AST type definitions

/**
 * Represents an XML node in the Android layout tree
 */
export interface XMLNode {
  /** Tag name (e.g., 'LinearLayout', 'TextView') */
  tag: string;
  
  /** XML attributes (e.g., { 'android:layout_width': 'match_parent' }) */
  attributes: Record<string, string>;
  
  /** Child nodes */
  children: XMLNode[];
  
  /** Text content (for TextView, etc.) */
  textContent?: string;
}

/**
 * Represents converted React Native styles
 */
export interface ConvertedStyles {
  /** Layout-related attributes */
  layout: Record<string, string>;
  
  /** View-specific attributes */
  view: Record<string, string>;
  
  /** Text-specific attributes */
  text: Record<string, string>;
}

/**
 * React Native component mapping
 */
export interface ComponentMapping {
  /** React Native component name */
  rnComponent: string;
  
  /** Android XML tag */
  xmlTag: string;
  
  /** Whether it can have children */
  canHaveChildren: boolean;
}
