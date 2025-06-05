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
      <TabsList className="my-0 mx-auto bg-white">
        <TabsTrigger
          value="dynamic"
          className="cursor-pointer mx-1 p-4 gap-x-2 text-red-500 data-[state=active]:bg-red-500 data-[state=active]:text-white"
        >
          <FaPersonRunning />
          {t('dynamic')}
        </TabsTrigger>
        <TabsTrigger
          value="static"
          className="cursor-pointer mx-1 p-4 gap-x-2 text-indigo-500 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
        >
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
          <TabsList className="my-0 mx-auto bg-white">
            <TabsTrigger
              value="static_ground"
              className="cursor-pointer mx-1 p-4 gap-x-2 text-green-500 data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <GiMeditation />
              {t('ground')}
            </TabsTrigger>
            <TabsTrigger
              value="static_water"
              className="cursor-pointer mx-1 p-4 gap-x-2 text-cyan-500 data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
            >
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
