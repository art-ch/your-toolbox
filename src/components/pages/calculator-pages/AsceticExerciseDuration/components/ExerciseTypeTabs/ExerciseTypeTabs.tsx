import React from 'react';

import { Tabs, TabsList, TabsContent } from '@/components/ui/tabs';
import { FormTab } from './components/FormTab';
import { Trigger } from './components/Trigger';
import { EXERCISE_TYPE_TABS_CONFIG } from './config/tabsConfig';
import { ExerciseTypeConfigItem } from './ExerciseTypeTabs.types';
import { useExerciseTypeUrlState } from './hooks/useExerciseTypeUrlState';

export const ExerciseTypeTabs = () => {
  const { exerciseTypePath, handleTabChange } = useExerciseTypeUrlState(
    EXERCISE_TYPE_TABS_CONFIG
  );

  const renderTabs = (
    config: ExerciseTypeConfigItem[],
    depth: number = 0
  ): React.ReactNode => {
    const currentValue = exerciseTypePath[depth];
    const defaultValue = currentValue || config[0]?.key || '';

    return (
      <Tabs
        value={defaultValue}
        onValueChange={(value) => handleTabChange(value, depth)}
      >
        <TabsList className="my-0 mx-auto bg-white">
          {config.map((configItem) => (
            <Trigger
              key={configItem.key}
              value={configItem.key}
              color={configItem.themeColor}
              icon={configItem.icon}
            />
          ))}
        </TabsList>

        {config.map((configItem) => {
          // If item has forms, render them directly
          if (configItem.forms && configItem.forms.length > 0) {
            return (
              <FormTab key={configItem.key} value={configItem.key}>
                {configItem.forms.map((FormComponent, index) => (
                  <FormComponent key={index} />
                ))}
              </FormTab>
            );
          }

          // If item has children, render nested tabs
          if (configItem.children && configItem.children.length > 0) {
            return (
              <TabsContent key={configItem.key} value={configItem.key}>
                {renderTabs(configItem.children, depth + 1)}
              </TabsContent>
            );
          }

          // Fallback for items without forms or children
          return null;
        })}
      </Tabs>
    );
  };

  return renderTabs(EXERCISE_TYPE_TABS_CONFIG);
};
