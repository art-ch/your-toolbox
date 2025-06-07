import React from 'react';

import { Tabs, TabsList, TabsContent } from '@/components/ui/tabs';
import { FaPerson, FaPersonRunning, FaPersonSwimming } from 'react-icons/fa6';
import { GiMeditation } from 'react-icons/gi';

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
import { FormTab } from './components/FormTab';
import { Trigger } from './components/Trigger';
import { ThemeColor } from './ExerciseTypeTabs.types';

export const ExerciseTypeTabs = () => {
  return (
    <Tabs defaultValue="dynamic">
      <TabsList className="my-0 mx-auto bg-white">
        <Trigger
          value="dynamic"
          color={ThemeColor.RED}
          icon={<FaPersonRunning />}
        />
        <Trigger value="static" color={ThemeColor.INDIGO} icon={<FaPerson />} />
      </TabsList>
      <FormTab value="dynamic">
        <CalculateCleansingCyclesForm />
        <CalculateSpeedForm />
        <CalculateTotalTimeForm />
      </FormTab>
      <TabsContent value="static">
        <Tabs defaultValue="ground">
          <TabsList className="my-0 mx-auto bg-white">
            <Trigger
              value="ground"
              color={ThemeColor.GREEN}
              icon={<GiMeditation />}
            />
            <Trigger
              value="water"
              color={ThemeColor.CYAN}
              icon={<FaPersonSwimming />}
            />
          </TabsList>
          <FormTab value="ground">
            <CalculateDurationFromLayersForm />
            <CalculateLayersFromDurationForm />
          </FormTab>
          <FormTab value="water">
            <CalculateMentalLayersCleansedForm />
            <CalculateTemperatureForm />
            <CalculateExposureTimeForm />
          </FormTab>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};
