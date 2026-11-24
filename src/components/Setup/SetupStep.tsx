import React, { type ReactNode } from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { cn } from '../../utils/cn';
import { renderIcon, type IconSource } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { stepLabel } from './setupLogic';

export interface SetupStepAction {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface SetupStepProps {
  /** 0-based index of this step and how many there are; drawn as dots and "Step 1 of 3". */
  step: number;
  steps: number;
  icon?: IconSource;
  title: string;
  /** One or two sentences under the title: what this step is for. */
  lead?: string;
  children?: ReactNode;
  /** The main button (Continue, Open rKeyChat). */
  primary?: SetupStepAction;
  /** "Skip for now": a quiet way past a step the person is not ready for. */
  onSkip?: () => void;
  skipLabel?: string;
  onBack?: () => void;
  /** Width of the column, in px. Default 520. */
  width?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One screen of a first-run flow: a centred column with the step dots, a title, a lead, the step's own content
 * and a footer with Back at the left and Skip + the main button at the right. One thing at a time, so by the time
 * the person reaches the app nothing can have been set up wrong.
 */
export function SetupStep({ step, steps, icon, title, lead, children, primary, onSkip, skipLabel = 'Skip for now', onBack, width = 520, className, style }: SetupStepProps) {
  const label = stepLabel(step, steps);
  return (
    <ScrollView className={cn('flex-1 bg-background', className)} style={style} contentContainerClassName="min-h-full items-center justify-center px-4 py-10" keyboardShouldPersistTaps="handled">
      <View className="w-full gap-6" style={{ maxWidth: width }} accessibilityRole="summary" accessibilityLabel={title}>
        <View className="gap-4">
          {steps > 1 ? (
            <View className="flex-row items-center gap-2" accessibilityLabel={label}>
              <View className="flex-row items-center gap-1.5">
                {Array.from({ length: steps }, (_, i) => (
                  <View key={i} className={cn('h-1.5 rounded-full', i === step ? 'w-5 bg-primary' : i < step ? 'w-1.5 bg-primary/50' : 'w-1.5 bg-overlay/20')} />
                ))}
              </View>
              <Text variant="micro" tone="subtle">
                {label}
              </Text>
            </View>
          ) : null}
          <View className="flex-row items-center gap-3">
            {icon ? (
              <View className="h-11 w-11 items-center justify-center rounded-xl border border-overlay/[0.07] bg-overlay/[0.04]">{renderIcon(icon, { size: 22, tone: 'icon-strong', emboss: true })}</View>
            ) : null}
            <View className="min-w-0 flex-1 gap-1">
              <Text variant="display" className="leading-7">
                {title}
              </Text>
              {lead ? (
                <Text variant="body" tone="muted" className="leading-5">
                  {lead}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        {children ? <View className="gap-3">{children}</View> : null}
        {primary || onSkip || onBack ? (
          <View className="flex-row items-center gap-2 pt-1">
            {onBack ? <Button variant="ghost" label="Back" icon="chevron-left" onPress={onBack} /> : null}
            <View className="flex-1" />
            {onSkip ? <Button variant="ghost" label={skipLabel} onPress={onSkip} /> : null}
            {primary ? <Button variant="primary" size="lg" label={primary.label} onPress={primary.onPress} disabled={primary.disabled} loading={primary.loading} iconRight="chevron-right" /> : null}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
