// Duration thresholds (in minutes) for different temperature ranges
export const MAX_SAFE_DURATION_EXTREME_COLD = 2; // For trained individuals in extremely cold water (≤2°C)
export const MAX_SAFE_DURATION_VERY_COLD = 5; // For trained individuals in very cold water (2°C-10°C)
export const MAX_SAFE_DURATION_COLD = 30; // For trained individuals in cold water (10°C-25°C)
export const MAX_SAFE_DURATION_NORMAL = 120; // For untrained individuals in normal water (25°C-30°C)
export const MAX_SAFE_DURATION_WARM = 60; // For all individuals in warm water (30°C-40°C)
export const MAX_SAFE_DURATION_HOT = 15; // For all individuals in hot water (>40°C)

// Additional temperature thresholds for more granular warnings
export const VERY_COLD_WATER_THRESHOLD = 10; // 10°C - Threshold between very cold and cold water
export const WARM_WATER_THRESHOLD = 30; // 30°C - Threshold between normal and warm water
