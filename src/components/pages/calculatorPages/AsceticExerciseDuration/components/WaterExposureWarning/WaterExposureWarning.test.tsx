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
import { formatTime } from '@/utils/timeUtils';

jest.mock('@/utils/timeUtils', () => ({
  formatTime: jest.fn((minutes) => `${minutes} minutes`)
}));

describe('WaterExposureWarning', () => {
  // Extremely cold water tests
  describe('Extremely cold water (≤2°C)', () => {
    it('should display extreme danger warning for water below or at MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED', () => {
      render(<WaterExposureWarning temperature={1} duration={5} />);

      expect(screen.getByText(/EXTREME DANGER/i)).toBeInTheDocument();
      expect(
        screen.getByText(/below the minimum safe temperature/i)
      ).toBeInTheDocument();
    });

    it('should display additional warning when duration exceeds MAX_SAFE_DURATION_EXTREME_COLD', () => {
      const dangerousDuration = MAX_SAFE_DURATION_EXTREME_COLD + 1;
      render(
        <WaterExposureWarning temperature={1} duration={dangerousDuration} />
      );

      expect(screen.getByText(/URGENT/i)).toBeInTheDocument();
      expect(screen.getByText(/exceeds safe limits/i)).toBeInTheDocument();
    });

    it('should display cautionary advice when duration is within safe limits', () => {
      const safeDuration = MAX_SAFE_DURATION_EXTREME_COLD - 1;
      render(<WaterExposureWarning temperature={2} duration={safeDuration} />);

      expect(
        screen.getByText(/Only trained cold water specialists/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          new RegExp(
            `Limit exposure to less than ${MAX_SAFE_DURATION_EXTREME_COLD} minutes`
          )
        )
      ).toBeInTheDocument();
    });
  });

  // Very cold water tests
  describe('Very cold water (>2°C to ≤10°C)', () => {
    it('should display warning for water between MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED and VERY_COLD_WATER_THRESHOLD', () => {
      const temperature =
        (MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED + VERY_COLD_WATER_THRESHOLD) /
        2;
      render(<WaterExposureWarning temperature={temperature} duration={5} />);

      expect(screen.getByText(/WARNING/i)).toBeInTheDocument();
      expect(
        screen.getByText(/only safe for trained cold water individuals/i)
      ).toBeInTheDocument();
    });

    it('should display danger warning when duration exceeds MAX_SAFE_DURATION_VERY_COLD', () => {
      const dangerousDuration = MAX_SAFE_DURATION_VERY_COLD + 1;
      render(
        <WaterExposureWarning temperature={5} duration={dangerousDuration} />
      );

      expect(screen.getByText(/DANGER/i)).toBeInTheDocument();
      expect(
        screen.getByText(/exceeds safe limits even for trained individuals/i)
      ).toBeInTheDocument();
    });

    it('should display cautionary advice when duration is within safe limits', () => {
      const safeDuration = MAX_SAFE_DURATION_VERY_COLD - 1;
      render(<WaterExposureWarning temperature={5} duration={safeDuration} />);

      expect(
        screen.getByText(/Trained individuals should limit exposure/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          new RegExp(`less than ${MAX_SAFE_DURATION_VERY_COLD} minutes`)
        )
      ).toBeInTheDocument();
    });
  });

  // Cold water tests
  describe('Cold water (>10°C to <25°C)', () => {
    it('should display caution for water between VERY_COLD_WATER_THRESHOLD and MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED', () => {
      const temperature =
        (VERY_COLD_WATER_THRESHOLD + MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED) /
        2;
      render(<WaterExposureWarning temperature={temperature} duration={5} />);

      expect(screen.getByText(/CAUTION/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /below the minimum safe temperature for untrained individuals/i
        )
      ).toBeInTheDocument();
    });

    it('should display warning when duration exceeds MAX_SAFE_DURATION_COLD', () => {
      const dangerousDuration = MAX_SAFE_DURATION_COLD + 1;
      render(
        <WaterExposureWarning temperature={15} duration={dangerousDuration} />
      );

      expect(
        screen.getByText(
          /exceeds recommended duration for trained individuals/i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Risk of hypothermia increases/i)
      ).toBeInTheDocument();
    });

    it('should display advice when duration is within safe limits', () => {
      const safeDuration = MAX_SAFE_DURATION_COLD - 1;
      render(<WaterExposureWarning temperature={15} duration={safeDuration} />);

      expect(
        screen.getByText(
          /Only trained individuals should exercise in this water/i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          new RegExp(`less than ${MAX_SAFE_DURATION_COLD} minutes`)
        )
      ).toBeInTheDocument();
    });
  });

  // Normal water tests
  describe('Normal water (≥25°C to <30°C)', () => {
    it('should display safe message for water between MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED and WARM_WATER_THRESHOLD', () => {
      const temperature =
        (MIN_SAFE_WATER_TEMPERATURE_FOR_UNTRAINED + WARM_WATER_THRESHOLD) / 2;
      render(<WaterExposureWarning temperature={temperature} duration={5} />);

      expect(
        screen.getByText(/within safe range for untrained individuals/i)
      ).toBeInTheDocument();
    });

    it('should display caution when duration exceeds MAX_SAFE_DURATION_NORMAL', () => {
      const longDuration = MAX_SAFE_DURATION_NORMAL + 1;
      render(<WaterExposureWarning temperature={27} duration={longDuration} />);

      expect(screen.getByText(/is an extended session/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Consider taking periodic breaks/i)
      ).toBeInTheDocument();
    });

    it('should display safe message when duration is within normal limits', () => {
      const safeDuration = MAX_SAFE_DURATION_NORMAL - 1;
      render(<WaterExposureWarning temperature={27} duration={safeDuration} />);

      expect(
        screen.getByText(/Safe for exposure for up to/i)
      ).toBeInTheDocument();
      expect(formatTime).toHaveBeenCalledWith(MAX_SAFE_DURATION_NORMAL);
    });
  });

  // Warm water tests
  describe('Warm water (≥30°C to ≤40°C)', () => {
    it('should display notice for water between WARM_WATER_THRESHOLD and MAX_SAFE_WATER_TEMPERATURE', () => {
      const temperature =
        (WARM_WATER_THRESHOLD + MAX_SAFE_WATER_TEMPERATURE) / 2;
      render(<WaterExposureWarning temperature={temperature} duration={5} />);

      expect(screen.getByText(/NOTICE/i)).toBeInTheDocument();
      expect(
        screen.getByText(/warm and approaching maximum safe temperature/i)
      ).toBeInTheDocument();
    });

    it('should display warning when duration exceeds MAX_SAFE_DURATION_WARM', () => {
      const dangerousDuration = MAX_SAFE_DURATION_WARM + 1;
      render(
        <WaterExposureWarning temperature={35} duration={dangerousDuration} />
      );

      expect(
        screen.getByText(/exceeds recommended duration/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Risk of overheating increases/i)
      ).toBeInTheDocument();
    });

    it('should display advice when duration is within safe limits', () => {
      const safeDuration = MAX_SAFE_DURATION_WARM - 1;
      render(<WaterExposureWarning temperature={35} duration={safeDuration} />);

      expect(
        screen.getByText(/Limit continuous exposure/i)
      ).toBeInTheDocument();
      expect(formatTime).toHaveBeenCalledWith(MAX_SAFE_DURATION_WARM);
    });
  });

  // Hot water tests
  describe('Hot water (>40°C)', () => {
    it('should display danger warning for water above MAX_SAFE_WATER_TEMPERATURE', () => {
      render(<WaterExposureWarning temperature={41} duration={5} />);

      expect(screen.getByText(/DANGER/i)).toBeInTheDocument();
      expect(
        screen.getByText(/exceeds maximum safe water temperature/i)
      ).toBeInTheDocument();
    });

    it('should display urgent warning when duration exceeds MAX_SAFE_DURATION_HOT', () => {
      const dangerousDuration = MAX_SAFE_DURATION_HOT + 1;
      render(
        <WaterExposureWarning temperature={41} duration={dangerousDuration} />
      );

      expect(screen.getByText(/URGENT/i)).toBeInTheDocument();
      expect(screen.getByText(/is excessive/i)).toBeInTheDocument();
    });

    it('should display advice when duration is within limits', () => {
      const safeDuration = MAX_SAFE_DURATION_HOT - 1;
      render(<WaterExposureWarning temperature={41} duration={safeDuration} />);

      expect(
        screen.getByText(/Not recommended for exercising/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          new RegExp(`less than ${MAX_SAFE_DURATION_HOT} minutes`)
        )
      ).toBeInTheDocument();
    });
  });
});
