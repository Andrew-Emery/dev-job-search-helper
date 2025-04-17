import React from 'react';

import { Box, useTheme } from '@mui/material';

import { useNotifications } from '../../context/NotificationContext';
import { Toast } from './Toast';

export const ToastContainer: React.FC = () => {
  const theme = useTheme();
  const { notifications, dismissNotification } = useNotifications();
  const activeNotifications = notifications.filter(n => !n.dismissed);

  if (activeNotifications.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: theme.spacing(2),
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: theme.zIndex.snackbar,
        width: '100%',
        maxWidth: 600,
        padding: 2,
      }}
    >
      {activeNotifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </Box>
  );
}; 