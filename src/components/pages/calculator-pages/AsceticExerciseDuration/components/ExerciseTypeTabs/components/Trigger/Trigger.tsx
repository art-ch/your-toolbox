import { TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { ThemeColor } from '../../ExerciseTypeTabs.types';

export type TriggerProps = {
  icon: React.ReactNode;
  color: ThemeColor;
  value: string;
};

export const Trigger = ({ value, color, icon }: TriggerProps) => {
  const { t } = useTranslation('asceticExerciseDuration');

  return (
    <TabsTrigger
      value={value}
      className={`cursor-pointer mx-1 p-4 gap-x-2 text-${color}-500 data-[state=active]:bg-${color}-500 data-[state=active]:text-white`}
    >
      {icon}
      {t(value)}
    </TabsTrigger>
  );
};
