import { TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { ThemeColor } from '../../ExerciseTypeTabs.types';
import { THEME_COLOR_TO_CLASS_MAP } from '../../config/themeColorToClassMap';

export type TriggerProps = {
  icon: React.ReactNode;
  color: ThemeColor;
  value: string;
};

export const Trigger = ({ value, color, icon }: TriggerProps) => {
  const { t } = useTranslation('asceticExerciseDuration');
  const colorClasses = THEME_COLOR_TO_CLASS_MAP[color];

  return (
    <TabsTrigger
      value={value}
      className={`cursor-pointer mx-1 p-4 gap-x-2 ${colorClasses.text} ${colorClasses.activeBg} data-[state=active]:text-white`}
    >
      {icon}
      {t(value)}
    </TabsTrigger>
  );
};
