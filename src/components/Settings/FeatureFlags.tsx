import React from 'react';

import { Box, FormControlLabel, Switch, Typography } from '@mui/material';

import { useNotifications } from '../../context/NotificationContext';
import { useFeatureFlags } from '../../hooks/useFeatureFlags';

export const FeatureFlags: React.FC = () => {
  const { isFeatureEnabled, toggleFeature } = useFeatureFlags();
  const { addNotification } = useNotifications();

  const handleFeatureToggle = (flag: 'attempt_answer') => {
    const newState = !isFeatureEnabled(flag);
    toggleFeature(flag);
    
    const featureNames = {
      'attempt_answer': 'Answer Attempt Feature'
    };
    
    addNotification(
      `${featureNames[flag]} ${newState ? 'enabled' : 'disabled'}`,
      newState ? 'success' : 'info'
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Feature Flags
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Enable or disable experimental features. Some features may be unstable or in development.
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={isFeatureEnabled('attempt_answer')}
            onChange={() => handleFeatureToggle('attempt_answer')}
          />
        }
        label={
          <Box>
            <Typography variant="body1">Answer Attempt Feature</Typography>
            <Typography variant="body2" color="text.secondary">
              Allows you to attempt answering interview questions before viewing the solution
            </Typography>
          </Box>
        }
      />
    </Box>
  );
}; 