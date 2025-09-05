import { GiMeditation } from 'react-icons/gi';
import { FaPerson, FaPersonRunning, FaPersonSwimming } from 'react-icons/fa6';
import { ExerciseTypeConfig, ThemeColor } from '../ExerciseTypeTabs.types';
import { CalculateCleansingCyclesForm } from '../../forms/dynamic-exercise-forms/CalculateCleansingCyclesForm';
import { CalculateSpeedForm } from '../../forms/dynamic-exercise-forms/CalculateSpeedForm';
import { CalculateTotalTimeForm } from '../../forms/dynamic-exercise-forms/CalculateTotalTimeForm';
import { CalculateDurationFromLayersForm } from '../../forms/static-exercise-forms/CalculateDurationFromLayers';
import { CalculateLayersFromDurationForm } from '../../forms/static-exercise-forms/CalculateLayersFromDuration';
import { CalculateMentalLayersCleansedForm } from '../../forms/static-exercise-forms/CalculateMentalLayersCleansedForm';
import { CalculateTemperatureForm } from '../../forms/static-exercise-forms/CalculateTemperatureForm';
import { CalculateExposureTimeForm } from '../../forms/static-exercise-forms/CalculateExposureTimeForm';

export const EXERCISE_TYPE_TABS_CONFIG: ExerciseTypeConfig = [
  {
    key: 'dynamic',
    themeColor: ThemeColor.RED,
    icon: <FaPersonRunning />,
    forms: [
      CalculateCleansingCyclesForm,
      CalculateSpeedForm,
      CalculateTotalTimeForm
    ]
  },
  {
    key: 'static',
    themeColor: ThemeColor.INDIGO,
    icon: <FaPerson />,
    children: [
      {
        key: 'ground',
        themeColor: ThemeColor.GREEN,
        icon: <GiMeditation />,
        forms: [
          CalculateDurationFromLayersForm,
          CalculateLayersFromDurationForm
        ]
      },
      {
        key: 'water',
        themeColor: ThemeColor.CYAN,
        icon: <FaPersonSwimming />,
        forms: [
          CalculateExposureTimeForm,
          CalculateMentalLayersCleansedForm,
          CalculateTemperatureForm
        ]
      }
    ]
  }
];
