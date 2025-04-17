import React, { useState } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    Badge, Box, Button, IconButton, List, ListItem, ListItemText, Popover, Typography
} from '@mui/material';

import { useNotifications } from '../../context/NotificationContext';

export const NotificationCenter: React.FC = () => {
  const { notifications, clearNotifications } = useNotifications();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const activeNotifications = notifications.filter(n => !n.dismissed).length;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        aria-label={`${activeNotifications} notifications`}
      >
        <Badge badgeContent={activeNotifications} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: 300, maxHeight: 400 }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Notifications</Typography>
          </Box>
          {notifications.length > 0 ? (
            <>
              <List sx={{ py: 0 }}>
                {notifications.map((notification) => (
                  <ListItem
                    key={notification.id}
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      opacity: notification.dismissed ? 0.6 : 1,
                    }}
                  >
                    <ListItemText
                      primary={notification.message}
                      secondary={new Date(notification.timestamp).toLocaleTimeString()}
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ p: 1, borderTop: 1, borderColor: 'divider' }}>
                <Button
                  fullWidth
                  onClick={() => {
                    clearNotifications();
                    handleClose();
                  }}
                >
                  Clear All
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography color="text.secondary" align="center">
                No notifications
              </Typography>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
}; 