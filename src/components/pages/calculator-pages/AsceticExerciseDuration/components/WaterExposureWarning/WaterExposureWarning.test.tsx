import React from 'react';
import { render, screen } from '@testing-library/react';
import { WaterExposureWarning } from './WaterExposureWarning';
import {
  MAX_SAFE_DURATION_COLD,
  MAX_SAFE_DURATION_EXTREME_COLD,
  MAX_SAFE_DURATION_HOT,
  MAX_SAFE_DURATION_NORMAL,
  MAX_SAFE_DURATION_VERY_COLD,
  MAX_SAFE_DURATION_WARM,
  VERY_COLD_WATER_THRESHOLD,
  WARM_WATER_THRESHOLD
} from './WaterExposureWarning.constants';
import {
  MAX_SAFE_WATER_TEMPERATURE,
  MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED,
  MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED
} from '../../constants/StaticExercise.constants';

// Mock translation hooks and utilities
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string>) => {
      if (options) {
        return `${key}_with_${JSON.stringify(options)}`;
      }
      return key;
    },
    i18n: {
      language: 'en'
    }
  })
}));

// Mock formatTime utility with grammar case support
jest.mock('@/utils/i18n', () => ({
  formatTime: jest.fn((params) => `${params.totalMinutes}_minutes_formatted`)
}));

// Mock parseLanguage utility
jest.mock('@/utils/i18n/parseLanguage', () => ({
  parseLanguage: jest.fn(() => 'en')
}));

describe('WaterExposureWarning', () => {
  const renderComponent = (temperature: number, duration: number) => {
    return render(
      <WaterExposureWarning temperature={temperature} duration={duration} />
    );
  };

  describe('Extremely Cold Water (≤2°C)', () => {
    it('should display extreme cold water danger warning', () => {
      renderComponent(1, 1);

      expect(screen.getByText('extremelyColdWaterDanger:')).toBeInTheDocument();
      expect(
        screen.getByText(
          'extremelyColdWaterDangerDescription_with_{"temperature":1}'
        )
      ).toBeInTheDocument();
    });

    it('should display safe duration message for short exposure', () => {
      renderComponent(2, MAX_SAFE_DURATION_EXTREME_COLD);

      expect(
        screen.getByText(
          'extremelyColdWaterForTrainedSpecialists_with_{"duration":"2_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });

    it('should display dangerous duration warning for long exposure', () => {
      renderComponent(1, MAX_SAFE_DURATION_EXTREME_COLD + 1);

      expect(
        screen.getByText('extremelyColdWaterDangerousDuration:')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'extremelyColdWaterDangerousDurationDescription_with_{"duration":"3_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Very Cold Water (>2°C to ≤10°C)', () => {
    it('should display very cold water warning', () => {
      renderComponent(5, 3);

      expect(screen.getByText('veryColdWaterWarning:')).toBeInTheDocument();
      expect(
        screen.getByText(
          'veryColdWaterWarningDescription_with_{"temperature":5}'
        )
      ).toBeInTheDocument();
    });

    it('should display safe duration message for short exposure', () => {
      renderComponent(8, MAX_SAFE_DURATION_VERY_COLD);

      expect(
        screen.getByText(
          'veryColdWaterTrainedIndividuals_with_{"duration":"5_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });

    it('should display dangerous duration warning for long exposure', () => {
      renderComponent(10, MAX_SAFE_DURATION_VERY_COLD + 1);

      expect(
        screen.getByText('veryColdWaterDangerousDuration:')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'veryColdWaterDangerousDurationDescription_with_{"duration":"6_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Cold Water (>10°C to <25°C)', () => {
    it('should display cold water caution warning', () => {
      renderComponent(15, 20);

      expect(screen.getByText('coldWaterCaution:')).toBeInTheDocument();
      expect(
        screen.getByText('coldWaterCautionDescription_with_{"temperature":15}')
      ).toBeInTheDocument();
    });

    it('should display safe duration message for short exposure', () => {
      renderComponent(20, MAX_SAFE_DURATION_COLD);

      expect(
        screen.getByText(
          'coldWaterTrainedIndividuals_with_{"duration":"30_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });

    it('should display dangerous duration warning for long exposure', () => {
      renderComponent(24, MAX_SAFE_DURATION_COLD + 1);

      expect(
        screen.getByText(
          'coldWaterDangerousDuration_with_{"duration":"31_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Normal Water (≥25°C to <30°C)', () => {
    it('should display normal water description', () => {
      renderComponent(27, 60);

      expect(
        screen.getByText('normalWaterDescription_with_{"temperature":27}')
      ).toBeInTheDocument();
    });

    it('should display safe duration message for short exposure', () => {
      renderComponent(28, MAX_SAFE_DURATION_NORMAL);

      expect(
        screen.getByText(
          'normalWaterSafeForExposure_with_{"duration":"120_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });

    it('should display long duration warning for extended exposure', () => {
      renderComponent(29, MAX_SAFE_DURATION_NORMAL + 1);

      expect(
        screen.getByText(
          'normalWaterLongDuration_with_{"duration":"121_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Warm Water (≥30°C to ≤40°C)', () => {
    it('should display warm water notice', () => {
      renderComponent(35, 30);

      expect(screen.getByText('warmWaterNotice:')).toBeInTheDocument();
      expect(
        screen.getByText('warmWaterNoticeDescription_with_{"temperature":35}')
      ).toBeInTheDocument();
    });

    it('should display safe duration message for short exposure', () => {
      renderComponent(32, MAX_SAFE_DURATION_WARM);

      expect(
        screen.getByText(
          'warmWaterLimitExposure_with_{"duration":"60_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });

    it('should display dangerous duration warning for long exposure', () => {
      renderComponent(40, MAX_SAFE_DURATION_WARM + 1);

      expect(
        screen.getByText(
          'warmWaterDangerousDuration_with_{"duration":"61_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Hot Water (>40°C)', () => {
    it('should display hot water danger warning', () => {
      renderComponent(45, 10);

      expect(screen.getByText('hotWaterDanger:')).toBeInTheDocument();
      expect(
        screen.getByText('hotWaterDangerDescription_with_{"temperature":45}')
      ).toBeInTheDocument();
    });

    it('should display not suitable message for short exposure', () => {
      renderComponent(42, MAX_SAFE_DURATION_HOT);

      expect(
        screen.getByText(
          'hotWaterNotSuitableForExercising_with_{"duration":"15_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });

    it('should display dangerous duration warning for long exposure', () => {
      renderComponent(50, MAX_SAFE_DURATION_HOT + 1);

      expect(
        screen.getByText('hotWaterDangerousDuration:')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'hotWaterDangerousDurationDescription_with_{"duration":"16_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle boundary temperature values correctly', () => {
      // Test exact boundary at MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED (2°C)
      renderComponent(MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED, 1);
      expect(screen.getByText('extremelyColdWaterDanger:')).toBeInTheDocument();

      // Test just above the boundary
      renderComponent(MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED + 0.1, 1);
      expect(screen.getByText('veryColdWaterWarning:')).toBeInTheDocument();
    });

    it('should handle VERY_COLD_WATER_THRESHOLD boundary correctly', () => {
      // Test at boundary (10°C)
      renderComponent(VERY_COLD_WATER_THRESHOLD, 1);
      expect(screen.getByText('veryColdWaterWarning:')).toBeInTheDocument();

      // Test just above boundary
      renderComponent(VERY_COLD_WATER_THRESHOLD + 0.1, 1);
      expect(screen.getByText('coldWaterCaution:')).toBeInTheDocument();
    });

    it('should handle MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED boundary correctly', () => {
      // Test just below boundary (24.9°C)
      renderComponent(MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED - 0.1, 1);
      expect(screen.getByText('coldWaterCaution:')).toBeInTheDocument();

      // Test at boundary (25°C)
      renderComponent(MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED, 1);
      expect(
        screen.getByText('normalWaterDescription_with_{"temperature":25}')
      ).toBeInTheDocument();
    });

    it('should handle WARM_WATER_THRESHOLD boundary correctly', () => {
      // Test just below boundary (29.9°C)
      renderComponent(WARM_WATER_THRESHOLD - 0.1, 1);
      expect(
        screen.getByText('normalWaterDescription_with_{"temperature":29.9}')
      ).toBeInTheDocument();

      // Test at boundary (30°C)
      renderComponent(WARM_WATER_THRESHOLD, 1);
      expect(screen.getByText('warmWaterNotice:')).toBeInTheDocument();
    });

    it('should handle MAX_SAFE_WATER_TEMPERATURE boundary correctly', () => {
      // Test at boundary (40°C)
      renderComponent(MAX_SAFE_WATER_TEMPERATURE, 1);
      expect(screen.getByText('warmWaterNotice:')).toBeInTheDocument();

      // Test just above boundary
      renderComponent(MAX_SAFE_WATER_TEMPERATURE + 0.1, 1);
      expect(screen.getByText('hotWaterDanger:')).toBeInTheDocument();
    });

    it('should handle zero duration', () => {
      renderComponent(25, 0);
      expect(
        screen.getByText('normalWaterDescription_with_{"temperature":25}')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'normalWaterSafeForExposure_with_{"duration":"120_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });

    it('should handle very high duration values', () => {
      renderComponent(25, 1000);
      expect(
        screen.getByText(
          'normalWaterLongDuration_with_{"duration":"1000_minutes_formatted"}'
        )
      ).toBeInTheDocument();
    });
  });
});
