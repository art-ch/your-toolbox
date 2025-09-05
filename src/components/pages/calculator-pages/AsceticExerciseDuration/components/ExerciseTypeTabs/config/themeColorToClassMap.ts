import { ThemeColor } from '../ExerciseTypeTabs.types';

export const THEME_COLOR_TO_CLASS_MAP = {
  [ThemeColor.RED]: {
    text: 'text-red-500',
    activeBg: 'data-[state=active]:bg-red-500'
  },
  [ThemeColor.INDIGO]: {
    text: 'text-indigo-500',
    activeBg: 'data-[state=active]:bg-indigo-500'
  },
  [ThemeColor.GREEN]: {
    text: 'text-green-500',
    activeBg: 'data-[state=active]:bg-green-500'
  },
  [ThemeColor.CYAN]: {
    text: 'text-cyan-500',
    activeBg: 'data-[state=active]:bg-cyan-500'
  }
};
