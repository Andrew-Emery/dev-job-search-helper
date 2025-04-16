import { useState } from 'react';
import { Box } from '@mui/material';
import { JobApplication } from '../../db/types';
import { deleteApplication, duplicateApplication } from '../../db/db';
import { ApplicationCard } from './ApplicationCard';
import { ConfirmationModal } from '../Common/ConfirmationModal';

interface ApplicationCardListProps {
  applications: JobApplication[];
  onApplicationsChange: () => void;
  onEdit: (application: JobApplication) => void;
}

export const ApplicationCardList = ({ applications, onApplicationsChange, onEdit }: ApplicationCardListProps) => {
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setApplicationToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (applicationToDelete) {
      await deleteApplication(applicationToDelete);
      onApplicationsChange();
      setIsDeleteModalOpen(false);
      setApplicationToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setApplicationToDelete(null);
  };

  const handleDuplicate = async (id: number) => {
    await duplicateApplication(id);
    onApplicationsChange();
  };

  const handleExpand = (id: number) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {applications.map((app) => (
          <ApplicationCard 
            key={app.id} 
            app={app} 
            handleDuplicate={handleDuplicate} 
            handleEdit={onEdit} 
            handleDelete={handleDelete}
            isExpanded={expandedCardId === app.id}
            onExpand={handleExpand}
          />
        ))}
      </Box>

      <ConfirmationModal
        open={isDeleteModalOpen}
        title="Delete Application"
        message="Are you sure you want to delete this application? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
      />
    </>
  );
}; 