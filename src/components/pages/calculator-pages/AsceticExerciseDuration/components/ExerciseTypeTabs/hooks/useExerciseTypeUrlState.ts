import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ExerciseTypeConfigItem } from '../ExerciseTypeTabs.types';

/**
 * Custom hook for managing nested tab state synchronized with URL parameters.
 *
 * Handles complex hierarchical tab navigation where:
 * - Tab selections are persisted in URL as comma-separated path (e.g., "static,water")
 * - Parent tabs with children automatically select their first child
 * - State is initialized from URL on mount, with fallback to defaults
 * - All tab changes update both component state and browser URL
 *
 * @param config - Hierarchical configuration defining tab structure, icons, and forms
 * @returns Object containing current exercise type path and tab change handler
 *
 * @example
 * const { exerciseTypePath, handleTabChange } = useExerciseTypeUrlState(tabConfig);
 * // exerciseTypePath: ['static', 'ground']
 * // handleTabChange('water', 1) -> ['static', 'water']
 */
export const useExerciseTypeUrlState = (config: ExerciseTypeConfigItem[]) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [exerciseTypePath, setExerciseTypePath] = useState<string[]>([]);

  /**
   * Updates the browser URL with the given exercise type path.
   * Converts path array to comma-separated string in 'exerciseType' URL parameter.
   *
   * @param path - Array representing the hierarchical tab path
   * @example updateURL(['static', 'water']) -> URL: "?exerciseType=static,water"
   */
  const updateURL = useCallback(
    (path: string[]) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('exerciseType', path.join(','));
      router.push(`?${newSearchParams.toString()}`);
    },
    [searchParams, router]
  );

  /**
   * Synchronizes both component state and URL with the given path.
   * Ensures state and URL never get out of sync during updates.
   *
   * @param path - Array representing the hierarchical tab path
   */
  const syncStateAndURL = useCallback(
    (path: string[]) => {
      setExerciseTypePath(path);
      updateURL(path);
    },
    [updateURL]
  );

  /**
   * Initializes exercise type path from URL parameter on component mount.
   * If no URL parameter exists, sets default path and updates URL.
   * Uses early return pattern to avoid unnecessary nesting.
   */
  useEffect(() => {
    const exerciseTypeParam = searchParams.get('exerciseType');
    if (exerciseTypeParam) {
      setExerciseTypePath(exerciseTypeParam.split(','));
      return;
    }

    const defaultPath = ['dynamic'];
    syncStateAndURL(defaultPath);
  }, [searchParams, syncStateAndURL]);

  /**
   * Recursively searches the hierarchical config structure for an item with the given key.
   * Traverses both direct items and nested children to find matches at any level.
   *
   * @param exerciseTypeConfig - Config array to search within
   * @param searchedKey - The key to search for
   * @returns The matching config item or null if not found
   *
   * @example
   * findItemInConfig(config, 'water') -> { key: 'water', themeColor: 'CYAN', ... }
   */
  const findItemInConfig = useCallback(
    (
      exerciseTypeConfig: ExerciseTypeConfigItem[],
      searchedKey: string
    ): ExerciseTypeConfigItem | null => {
      for (const configItem of exerciseTypeConfig) {
        if (configItem.key === searchedKey) {
          return configItem;
        }

        if (configItem.children) {
          const childSearchResult = findItemInConfig(
            configItem.children,
            searchedKey
          );

          if (childSearchResult !== null) {
            return childSearchResult;
          }
        }
      }

      return null;
    },
    []
  );

  /**
   * Handles tab selection changes with automatic child selection logic.
   *
   * Process:
   * 1. Builds new path by replacing everything from the given depth onwards
   * 2. If selected item has children, automatically appends first child's key
   * 3. Updates both state and URL with the final path
   *
   * @param value - Key of the selected tab
   * @param depth - Nesting level (0 = top-level, 1 = nested, etc.)
   *
   * @example
   * Current path: ['static', 'ground']
   * handleTabChange('water', 1) -> ['static', 'water']
   *
   * @example
   * Current path: ['dynamic']
   * handleTabChange('static', 0) -> ['static', 'ground'] (auto-selects first child)
   */
  const handleTabChange = useCallback(
    (value: string, depth: number) => {
      const newPath = [...exerciseTypePath.slice(0, depth), value];

      const selectedItem = findItemInConfig(config, value);

      if (selectedItem?.children && selectedItem.children.length > 0) {
        newPath.push(selectedItem.children[0].key);
      }

      syncStateAndURL(newPath);
    },
    [exerciseTypePath, config, findItemInConfig, syncStateAndURL]
  );

  return {
    exerciseTypePath,
    handleTabChange
  };
};
