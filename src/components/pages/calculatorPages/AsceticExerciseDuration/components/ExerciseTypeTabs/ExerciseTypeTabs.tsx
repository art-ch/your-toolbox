import React from 'react';

import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { FaPerson, FaPersonRunning, FaPersonSwimming } from 'react-icons/fa6';
import { GiMeditation } from 'react-icons/gi';

import { AsceticExerciseDurationSection } from '../AsceticExerciseDurationSection';
import {
  CalculateCleansingCyclesForm,
  CalculateSpeedForm,
  CalculateTotalTimeForm
} from '../DynamicExerciseForms';
import {
  CalculateDurationFromLayersForm,
  CalculateExposureTimeForm,
  CalculateLayersFromDurationForm,
  CalculateMentalLayersCleansedForm,
  CalculateTemperatureForm
} from '../StaticExerciseForms';

export const ExerciseTypeTabs = () => (
  <Tabs defaultValue="dynamic">
    <TabsList className="my-0 mx-auto">
      <TabsTrigger value="dynamic">
        <FaPersonRunning />
        Dynamic
      </TabsTrigger>
      <TabsTrigger value="static">
        <FaPerson />
        Static
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
          <TabsTrigger value="static_ground">
            <GiMeditation />
            Ground
          </TabsTrigger>
          <TabsTrigger value="static_water">
            <FaPersonSwimming />
            Water
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
