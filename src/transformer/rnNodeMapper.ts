// Maps RN components → XML nodes

import { ComponentMapping } from '../parser/astTypes';

/**
 * Component mapping table
 */
const COMPONENT_MAP: ComponentMapping[] = [
  { rnComponent: 'View', xmlTag: 'LinearLayout', canHaveChildren: true },
  { rnComponent: 'Text', xmlTag: 'TextView', canHaveChildren: false },
  { rnComponent: 'Image', xmlTag: 'ImageView', canHaveChildren: false },
  { rnComponent: 'ScrollView', xmlTag: 'ScrollView', canHaveChildren: true },
  { rnComponent: 'FlatList', xmlTag: 'RecyclerView', canHaveChildren: false },
  { rnComponent: 'TextInput', xmlTag: 'EditText', canHaveChildren: false },
  { rnComponent: 'Button', xmlTag: 'Button', canHaveChildren: false },
  { rnComponent: 'TouchableOpacity', xmlTag: 'FrameLayout', canHaveChildren: true },
  { rnComponent: 'TouchableHighlight', xmlTag: 'FrameLayout', canHaveChildren: true },
  { rnComponent: 'Pressable', xmlTag: 'FrameLayout', canHaveChildren: true },
  { rnComponent: 'SafeAreaView', xmlTag: 'LinearLayout', canHaveChildren: true },
];

/**
 * Maps a React Native component name to an Android XML tag
 */
export function mapComponentToXml(componentName: string): string {
  const mapping = COMPONENT_MAP.find(m => m.rnComponent === componentName);
  return mapping?.xmlTag || 'View';
}

/**
 * Checks if a component can have children
 */
export function canHaveChildren(componentName: string): boolean {
  const mapping = COMPONENT_MAP.find(m => m.rnComponent === componentName);
  return mapping?.canHaveChildren ?? true;
}

/**
 * Determines the orientation for a layout based on flexDirection
 */
export function getOrientation(flexDirection?: string): string {
  if (!flexDirection || flexDirection === 'column') {
    return 'vertical';
  }
  if (flexDirection === 'row') {
    return 'horizontal';
  }
  return 'vertical';
}
