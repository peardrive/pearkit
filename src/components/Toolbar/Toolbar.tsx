import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import type { IconSource } from '../../icons/Icon';
import type { ColorToken } from '../../theme/tokens';
import { IconButton } from '../IconButton/IconButton';
import { Divider } from '../Divider/Divider';
import { Spacer } from '../Spacer/Spacer';

export interface ToolbarProps {
  children?: React.ReactNode;
  /** Bottom hairline. Default true. */
  bordered?: boolean;
  /** Empty toolbar space drags the window in Electron. Default false. */
  dragRegion?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/** 52px action bar at the top of a pane. */
export function Toolbar({ children, bordered = true, dragRegion, className, style }: ToolbarProps) {
  return (
    <View
      accessibilityRole="toolbar"
      className={cn('h-13 w-full flex-row items-center gap-1 px-3.5', bordered && 'border-b border-overlay/[0.06]', dragRegion && 'app-region-drag', className)}
      style={style}
    >
      {children}
    </View>
  );
}

export interface ToolbarButtonProps {
  icon: IconSource;
  label: string;
  shortcut?: string;
  onPress?: () => void;
  active?: boolean;
  disabled?: boolean;
  tone?: ColorToken;
  /** Show the tooltip immediately (docs / screenshots). */
  tooltipOpen?: boolean;
}

/** A 32px tool with a hover tooltip (label + shortcut). */
export function ToolbarButton({ icon, label, shortcut, onPress, active, disabled, tone, tooltipOpen }: ToolbarButtonProps) {
  return (
    <IconButton
      icon={icon}
      size="md"
      active={active}
      disabled={disabled}
      tone={tone}
      onPress={onPress}
      tooltip={{ label, shortcut, defaultOpen: tooltipOpen }}
      className="app-region-no-drag"
    />
  );
}

/** Vertical hairline between tool groups. */
export function ToolbarSeparator() {
  return (
    <View className="px-1.5">
      <Divider orientation="vertical" length={18} />
    </View>
  );
}

export const ToolbarSpacer = Spacer;
