import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { Notification, NotificationType } from '../types/notification.types';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: NotificationType) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: Date.now(),
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, dismissed: true }
          : notification
      )
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Auto-dismiss notifications after 3 seconds
  useEffect(() => {
    const timeouts = notifications
      .filter(n => !n.dismissed)
      .map(notification => {
        return setTimeout(() => {
          dismissNotification(notification.id);
        }, 3000);
      });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [notifications, dismissNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        dismissNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}; 