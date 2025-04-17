import React, { useState } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';

import { useNotifications } from '../../context/NotificationContext';
import { db } from '../../db/db';
import { ConfirmationModal } from '../Common/ConfirmationModal';

export const DatabaseManagement: React.FC = () => {
  const { addNotification } = useNotifications();
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleBackup = async () => {
    try {
      const blob = await db.export();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `frontend-dev-interview-helper-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addNotification('Database backup downloaded successfully', 'success');
    } catch {
      addNotification('Failed to backup database. Please try again.', 'error');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowRestoreConfirm(true);
    }
  };

  const handleRestore = async () => {
    if (!selectedFile) return;

    try {
      const text = await selectedFile.text();
      const blob = new Blob([text], { type: 'application/json' });
      await db.import(blob);
      addNotification('Database restored successfully!', 'success');
    } catch {
      addNotification('Failed to restore database. Please ensure the file is a valid backup.', 'error');
    } finally {
      setSelectedFile(null);
      setShowRestoreConfirm(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Database Management
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Backup your job applications to a file or restore from a previous backup.
        This is useful when switching devices or as a safety measure.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleBackup}
        >
          Backup Database
        </Button>
        <Button
          variant="outlined"
          component="label"
        >
          Restore Database
          <input
            type="file"
            hidden
            accept=".json"
            onChange={handleFileSelect}
          />
        </Button>
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Note: Restoring will overwrite your current data. Make sure to backup first if needed.
      </Typography>

      <ConfirmationModal
        open={showRestoreConfirm}
        onCancel={() => setShowRestoreConfirm(false)}
        onConfirm={handleRestore}
        title="Confirm Database Restore"
        message="Are you sure you want to restore the database? This will overwrite your current data."
        confirmText="Restore"
        cancelText="Cancel"
      />
    </Box>
  );
}; 