import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
  Container,
} from '@mui/material';

const FEATURE_FLAGS = {
  attempt_answer: 'attempt_answer',
} as const;

type FeatureFlag = keyof typeof FEATURE_FLAGS;

export const SettingsPage = () => {
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

  const handleFeatureFlagChange = (flag: FeatureFlag) => {
    const newValue = !featureFlags[flag];
    setFeatureFlags(prev => ({
      ...prev,
      [flag]: newValue,
    }));
    localStorage.setItem(flag, JSON.stringify(newValue));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Experimental Features
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={featureFlags.attempt_answer}
                onChange={() => handleFeatureFlagChange('attempt_answer')}
              />
            }
            label={
              <Box>
                <Typography>Attempt Answer</Typography>
                <Typography variant="body2" color="text.secondary">
                  Enable this feature to attempt answering questions before viewing the solution
                </Typography>
              </Box>
            }
          />
        </Box>
      </Paper>
    </Container>
  );
}; 