import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Slide } from '@mui/material';

import { Notification } from '../../types/notification.types';

interface ToastProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onDismiss }) => {
  if (notification.dismissed) {
    return null;
  }

  return (
    <Slide direction="down" in={!notification.dismissed} mountOnEnter unmountOnExit>
      <Alert
        severity={notification.type}
        sx={{
          width: '100%',
          boxShadow: 2,
          mb: 1,
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => onDismiss(notification.id)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {notification.message}
      </Alert>
    </Slide>
  );
}; 