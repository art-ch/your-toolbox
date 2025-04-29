'use client';

import { useState, useEffect, useCallback } from 'react';

type StorageType = 'local' | 'session';

const getStorage = (type: StorageType): Storage | null => {
  if (typeof window === 'undefined') return null;
  return type === 'local' ? window.localStorage : window.sessionStorage;
};

export function useStorage<T>(
  key: string,
  initialValue: T,
  options: {
    storageType?: StorageType;
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  } = {}
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const {
    storageType = 'local',
    serialize = JSON.stringify,
    deserialize = JSON.parse
  } = options;

  // State to store our value
  const [value, setValue] = useState<T>(() => {
    const storage = getStorage(storageType);
    if (!storage) return initialValue;

    try {
      const item = storage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Function to save to storage and update state
  const updateStorage = useCallback(
    (newValue: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          newValue instanceof Function ? newValue(value) : newValue;

        setValue(valueToStore);

        const storage = getStorage(storageType);
        if (storage) {
          storage.setItem(key, serialize(valueToStore));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [key, serialize, value, storageType]
  ); // storageType is stable within a hook instance

  // Function to remove from storage and reset state
  const removeFromStorage = useCallback(() => {
    try {
      const storage = getStorage(storageType);
      if (storage) {
        storage.removeItem(key);
        setValue(initialValue);
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, initialValue, storageType]); // storageType is stable within a hook instance

  // Sync with storage changes in other tabs/windows (for localStorage only)
  useEffect(() => {
    if (storageType !== 'local' || typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.storageArea === window.localStorage) {
        try {
          const newValue = e.newValue ? deserialize(e.newValue) : initialValue;
          setValue(newValue);
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue, deserialize, storageType]);

  return [value, updateStorage, removeFromStorage];
}

// Convenience wrappers for specific storage types
export function useLocalStorage<T>(key: string, initialValue: T, options = {}) {
  return useStorage(key, initialValue, { ...options, storageType: 'local' });
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options = {}
) {
  return useStorage(key, initialValue, { ...options, storageType: 'session' });
}
