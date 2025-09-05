import React from 'react';
import { renderHook, act } from '@testing-library/react';
import {
  useSearchParams,
  useRouter,
  ReadonlyURLSearchParams
} from 'next/navigation';
import { useExerciseTypeUrlState } from './useExerciseTypeUrlState';
import { ExerciseTypeConfigItem, ThemeColor } from '../ExerciseTypeTabs.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn()
}));

const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

// Mock router object - only include methods actually used
const mockRouter = {
  push: jest.fn()
} as unknown as AppRouterInstance;

// Mock search params object - only include methods actually used
const createMockSearchParams = (params: Record<string, string> = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  return {
    get: jest.fn((key: string) => searchParams.get(key)),
    toString: jest.fn(() => searchParams.toString())
  } as unknown as ReadonlyURLSearchParams;
};

// Test configuration data
const mockConfig: ExerciseTypeConfigItem[] = [
  {
    key: 'static',
    themeColor: ThemeColor.RED,
    icon: <span>Static Icon</span>,
    children: [
      {
        key: 'ground',
        themeColor: ThemeColor.GREEN,
        icon: <span>Ground Icon</span>
      },
      {
        key: 'water',
        themeColor: ThemeColor.CYAN,
        icon: <span>Water Icon</span>
      }
    ]
  },
  {
    key: 'dynamic',
    themeColor: ThemeColor.INDIGO,
    icon: <span>Dynamic Icon</span>,
    children: [
      {
        key: 'running',
        themeColor: ThemeColor.GREEN,
        icon: <span>Running Icon</span>
      },
      {
        key: 'swimming',
        themeColor: ThemeColor.CYAN,
        icon: <span>Swimming Icon</span>
      }
    ]
  },
  {
    key: 'mixed',
    themeColor: ThemeColor.GREEN,
    icon: <span>Mixed Icon</span>
  }
];

describe('useExerciseTypeUrlState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter);
  });

  describe('Initialization', () => {
    it('should initialize with default path when no URL parameter exists', () => {
      const mockSearchParams = createMockSearchParams();
      (mockSearchParams.get as jest.Mock).mockReturnValue(null);
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      expect(result.current.exerciseTypePath).toEqual(['dynamic']);
      expect(mockRouter.push).toHaveBeenCalledWith('?exerciseType=dynamic');
    });

    it('should initialize from URL parameter when it exists', () => {
      const mockSearchParams = createMockSearchParams({
        exerciseType: 'static,water'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      expect(result.current.exerciseTypePath).toEqual(['static', 'water']);
      expect(mockRouter.push).not.toHaveBeenCalled();
    });

    it('should handle empty URL parameter', () => {
      const mockSearchParams = createMockSearchParams({ exerciseType: '' });
      (mockSearchParams.get as jest.Mock).mockReturnValue('');
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      expect(result.current.exerciseTypePath).toEqual(['dynamic']);
      expect(mockRouter.push).toHaveBeenCalledWith('?exerciseType=dynamic');
    });

    it('should handle single value in URL parameter', () => {
      const mockSearchParams = createMockSearchParams({
        exerciseType: 'mixed'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      expect(result.current.exerciseTypePath).toEqual(['mixed']);
    });
  });

  describe('handleTabChange', () => {
    it('should handle tab change at depth 0 with children', () => {
      const mockSearchParams = createMockSearchParams({
        exerciseType: 'dynamic'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('static', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['static', 'ground']);
      expect(mockRouter.push).toHaveBeenCalledWith(
        '?exerciseType=static%2Cground'
      );
    });

    it('should handle tab change at depth 0 without children', () => {
      const mockSearchParams = createMockSearchParams({
        exerciseType: 'dynamic'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('mixed', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['mixed']);
      expect(mockRouter.push).toHaveBeenCalledWith('?exerciseType=mixed');
    });

    it('should handle tab change at depth 1', () => {
      const mockSearchParams = createMockSearchParams({
        exerciseType: 'static,ground'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('water', 1);
      });

      expect(result.current.exerciseTypePath).toEqual(['static', 'water']);
      expect(mockRouter.push).toHaveBeenCalledWith(
        '?exerciseType=static%2Cwater'
      );
    });

    it('should replace path from specified depth onwards', () => {
      const mockSearchParams = createMockSearchParams({
        exerciseType: 'static,ground,extra'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('water', 1);
      });

      expect(result.current.exerciseTypePath).toEqual(['static', 'water']);
      expect(mockRouter.push).toHaveBeenCalledWith(
        '?exerciseType=static%2Cwater'
      );
    });

    it('should handle tab change with nested children', () => {
      const configWithNestedChildren: ExerciseTypeConfigItem[] = [
        {
          key: 'level1',
          themeColor: ThemeColor.RED,
          icon: <span>Level 1</span>,
          children: [
            {
              key: 'level2',
              themeColor: ThemeColor.GREEN,
              icon: <span>Level 2</span>,
              children: [
                {
                  key: 'level3',
                  themeColor: ThemeColor.CYAN,
                  icon: <span>Level 3</span>
                }
              ]
            }
          ]
        }
      ];

      const mockSearchParams = createMockSearchParams({
        exerciseType: 'level1'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() =>
        useExerciseTypeUrlState(configWithNestedChildren)
      );

      act(() => {
        result.current.handleTabChange('level1', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['level1', 'level2']);
    });
  });

  describe('findItemInConfig', () => {
    it('should find item in top level', () => {
      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      // Access the internal function through the hook's behavior
      act(() => {
        result.current.handleTabChange('mixed', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['mixed']);
    });

    it('should find item in nested children', () => {
      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('static', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['static', 'ground']);
    });

    it('should return null for non-existent item', () => {
      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('non-existent', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['non-existent']);
    });
  });

  describe('URL Synchronization', () => {
    it('should update URL when state changes', () => {
      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('static', 0);
      });

      expect(mockRouter.push).toHaveBeenCalledWith(
        '?exerciseType=static%2Cground'
      );
    });

    it('should preserve other URL parameters', () => {
      const mockSearchParams = createMockSearchParams({
        exerciseType: 'dynamic',
        otherParam: 'otherValue'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('mixed', 0);
      });

      expect(mockRouter.push).toHaveBeenCalledWith(
        '?exerciseType=mixed&otherParam=otherValue'
      );
    });

    it('should handle multiple URL updates correctly', () => {
      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('static', 0);
      });

      expect(mockRouter.push).toHaveBeenCalledWith(
        '?exerciseType=static%2Cground'
      );

      act(() => {
        result.current.handleTabChange('water', 1);
      });

      expect(mockRouter.push).toHaveBeenCalledWith(
        '?exerciseType=static%2Cwater'
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty config array', () => {
      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState([]));

      act(() => {
        result.current.handleTabChange('any', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['any']);
    });

    it('should handle config with no children', () => {
      const configWithoutChildren: ExerciseTypeConfigItem[] = [
        {
          key: 'no-children',
          themeColor: ThemeColor.RED,
          icon: <span>No Children</span>
        }
      ];

      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() =>
        useExerciseTypeUrlState(configWithoutChildren)
      );

      act(() => {
        result.current.handleTabChange('no-children', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['no-children']);
    });

    it('should handle config with empty children array', () => {
      const configWithEmptyChildren: ExerciseTypeConfigItem[] = [
        {
          key: 'empty-children',
          themeColor: ThemeColor.RED,
          icon: <span>Empty Children</span>,
          children: []
        }
      ];

      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() =>
        useExerciseTypeUrlState(configWithEmptyChildren)
      );

      act(() => {
        result.current.handleTabChange('empty-children', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['empty-children']);
    });

    it('should handle negative depth', () => {
      const mockSearchParams = createMockSearchParams({
        exerciseType: 'static,ground'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('water', -1);
      });

      expect(result.current.exerciseTypePath).toEqual(['static', 'water']);
    });

    it('should handle depth greater than current path length', () => {
      const mockSearchParams = createMockSearchParams({
        exerciseType: 'static'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(mockConfig));

      act(() => {
        result.current.handleTabChange('water', 5);
      });

      expect(result.current.exerciseTypePath).toEqual(['static', 'water']);
    });
  });

  describe('Hook Dependencies', () => {
    it('should re-initialize when searchParams change', () => {
      const initialSearchParams = createMockSearchParams({
        exerciseType: 'static'
      });
      mockUseSearchParams.mockReturnValue(initialSearchParams);

      const { result, rerender } = renderHook(() =>
        useExerciseTypeUrlState(mockConfig)
      );

      expect(result.current.exerciseTypePath).toEqual(['static']);

      const newSearchParams = createMockSearchParams({
        exerciseType: 'dynamic,swimming'
      });
      mockUseSearchParams.mockReturnValue(newSearchParams);

      rerender();

      expect(result.current.exerciseTypePath).toEqual(['dynamic', 'swimming']);
    });

    it('should maintain stable references for returned functions', () => {
      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result, rerender } = renderHook(() =>
        useExerciseTypeUrlState(mockConfig)
      );

      const firstHandleTabChange = result.current.handleTabChange;

      rerender();

      expect(result.current.handleTabChange).toBe(firstHandleTabChange);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle deep nested configuration', () => {
      const deepConfig: ExerciseTypeConfigItem[] = [
        {
          key: 'level1',
          themeColor: ThemeColor.RED,
          icon: <span>L1</span>,
          children: [
            {
              key: 'level2',
              themeColor: ThemeColor.GREEN,
              icon: <span>L2</span>,
              children: [
                {
                  key: 'level3',
                  themeColor: ThemeColor.CYAN,
                  icon: <span>L3</span>,
                  children: [
                    {
                      key: 'level4',
                      themeColor: ThemeColor.INDIGO,
                      icon: <span>L4</span>
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];

      const mockSearchParams = createMockSearchParams();
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() => useExerciseTypeUrlState(deepConfig));

      act(() => {
        result.current.handleTabChange('level1', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['level1', 'level2']);
    });

    it('should handle multiple siblings with children', () => {
      const multiSiblingConfig: ExerciseTypeConfigItem[] = [
        {
          key: 'parent1',
          themeColor: ThemeColor.RED,
          icon: <span>P1</span>,
          children: [
            {
              key: 'child1',
              themeColor: ThemeColor.GREEN,
              icon: <span>C1</span>
            },
            {
              key: 'child2',
              themeColor: ThemeColor.CYAN,
              icon: <span>C2</span>
            }
          ]
        },
        {
          key: 'parent2',
          themeColor: ThemeColor.INDIGO,
          icon: <span>P2</span>,
          children: [
            {
              key: 'child3',
              themeColor: ThemeColor.GREEN,
              icon: <span>C3</span>
            },
            {
              key: 'child4',
              themeColor: ThemeColor.CYAN,
              icon: <span>C4</span>
            }
          ]
        }
      ];

      const mockSearchParams = createMockSearchParams({
        exerciseType: 'parent1,child1'
      });
      mockUseSearchParams.mockReturnValue(mockSearchParams);

      const { result } = renderHook(() =>
        useExerciseTypeUrlState(multiSiblingConfig)
      );

      act(() => {
        result.current.handleTabChange('parent2', 0);
      });

      expect(result.current.exerciseTypePath).toEqual(['parent2', 'child3']);
    });
  });
});
