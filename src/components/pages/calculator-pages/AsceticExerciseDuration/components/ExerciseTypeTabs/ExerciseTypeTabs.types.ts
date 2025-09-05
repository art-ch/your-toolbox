export enum ThemeColor {
  RED = 'red',
  INDIGO = 'indigo',
  GREEN = 'green',
  CYAN = 'cyan'
}

export type ExerciseTypeConfigItem = {
  key: string;
  themeColor: ThemeColor;
  icon: React.ReactNode;
  forms?: React.ComponentType[];
  children?: ExerciseTypeConfigItem[];
};

export type ExerciseTypeConfig = ExerciseTypeConfigItem[];
