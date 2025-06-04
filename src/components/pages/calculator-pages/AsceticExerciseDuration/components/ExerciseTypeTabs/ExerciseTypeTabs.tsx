import React from 'react';

import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { FaPerson, FaPersonRunning, FaPersonSwimming } from 'react-icons/fa6';
import { GiMeditation } from 'react-icons/gi';

import { AsceticExerciseDurationSection } from '../AsceticExerciseDurationSection';
import {
  CalculateCleansingCyclesForm,
  CalculateSpeedForm,
  CalculateTotalTimeForm
} from '../forms/dynamic-exercise-forms';
import {
  CalculateDurationFromLayersForm,
  CalculateExposureTimeForm,
  CalculateLayersFromDurationForm,
  CalculateMentalLayersCleansedForm,
  CalculateTemperatureForm
} from '../forms/static-exercise-forms';
import { useTranslation } from 'react-i18next';

export const ExerciseTypeTabs = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  return (
    <Tabs defaultValue="dynamic">
      <TabsList className="my-0 mx-auto">
        <TabsTrigger value="dynamic" className="cursor-pointer">
          <FaPersonRunning />
          {t('dynamic')}
        </TabsTrigger>
        <TabsTrigger value="static" className="cursor-pointer">
          <FaPerson />
          {t('static')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dynamic">
        <AsceticExerciseDurationSection>
          <CalculateCleansingCyclesForm />
          <CalculateSpeedForm />
          <CalculateTotalTimeForm />
        </AsceticExerciseDurationSection>
      </TabsContent>
      <TabsContent value="static">
        <Tabs defaultValue="static_ground">
          <TabsList className="my-0 mx-auto">
            <TabsTrigger value="static_ground" className="cursor-pointer">
              <GiMeditation />
              {t('ground')}
            </TabsTrigger>
            <TabsTrigger value="static_water" className="cursor-pointer">
              <FaPersonSwimming />
              {t('water')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="static_ground">
            <AsceticExerciseDurationSection>
              <CalculateDurationFromLayersForm />
              <CalculateLayersFromDurationForm />
            </AsceticExerciseDurationSection>
          </TabsContent>
          <TabsContent value="static_water">
            <AsceticExerciseDurationSection>
              <CalculateMentalLayersCleansedForm />
              <CalculateTemperatureForm />
              <CalculateExposureTimeForm />
            </AsceticExerciseDurationSection>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};
