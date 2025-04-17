import { useEffect, useState } from 'react';

const FEATURE_FLAGS = {
  attempt_answer: 'attempt_answer',
} as const;

type FeatureFlag = keyof typeof FEATURE_FLAGS;

export const useFeatureFlags = () => {
  const [featureFlags, setFeatureFlags] = useState<Record<FeatureFlag, boolean>>({
    attempt_answer: false,
  });

  useEffect(() => {
    // Load feature flags from localStorage
    const savedFlags = Object.keys(FEATURE_FLAGS).reduce((acc, flag) => {
      const savedValue = localStorage.getItem(flag);
      return {
        ...acc,
        [flag]: savedValue ? JSON.parse(savedValue) : false,
      };
    }, {} as Record<FeatureFlag, boolean>);
    setFeatureFlags(savedFlags);
  }, []);

  const isFeatureEnabled = (flag: FeatureFlag) => {
    return featureFlags[flag];
  };

  const toggleFeature = (flag: FeatureFlag) => {
    const newValue = !featureFlags[flag];
    localStorage.setItem(flag, JSON.stringify(newValue));
    setFeatureFlags(prev => ({
      ...prev,
      [flag]: newValue,
    }));
  };

  return {
    isFeatureEnabled,
    toggleFeature,
  };
}; 