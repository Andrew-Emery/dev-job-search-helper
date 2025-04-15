import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { JobApplication } from '../db/types';
import { getAllApplications, deleteApplication, duplicateApplication } from '../db/db';
import { ApplicationForm } from '../components/Applications/ApplicationForm';
import { ApplicationCard } from '../components/Applications/ApplicationCard';

export const ApplicationsPage = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const apps = await getAllApplications();
    setApplications(apps);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      await deleteApplication(id);
      await loadApplications();
    }
  };

  const handleDuplicate = async (id: number) => {
    await duplicateApplication(id);
    await loadApplications();
  };

  const handleEdit = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedApplication(null);
    loadApplications();
  };

  const handleExpand = (id: number) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Job Applications
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
          >
            Add Application
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {applications.map((app) => (
            <ApplicationCard 
              key={app.id} 
              app={app} 
              handleDuplicate={handleDuplicate} 
              handleEdit={handleEdit} 
              handleDelete={handleDelete}
              isExpanded={expandedCardId === app.id}
              onExpand={handleExpand}
            />
          ))}
        </Box>

        <Dialog
          open={isFormOpen}
          onClose={handleFormClose}
          maxWidth="md"
          fullWidth
        >
          <ApplicationForm
            application={selectedApplication}
            onClose={handleFormClose}
          />
        </Dialog>
      </Box>
    </Container>
  );
}; 