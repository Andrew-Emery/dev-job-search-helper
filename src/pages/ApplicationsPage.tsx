import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { JobApplication } from '../db/types';
import { getAllApplications } from '../db/db';
import { ApplicationForm } from '../components/Applications/ApplicationForm';
import { ApplicationCardList } from '../components/Applications/ApplicationCardList';
import { Pagination, ItemsPerPageOption } from '../components/Common/Pagination';

export const ApplicationsPage = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPageOption>(10);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const apps = await getAllApplications();
    const sortedApps = apps.sort((a, b) => {
      const dateA = a.lastEditedDate || a.createdDate;
      const dateB = b.lastEditedDate || b.createdDate;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    setApplications(sortedApps);
  };

  const handleEdit = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedApplication(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: ItemsPerPageOption) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const renderApplications = (paginatedApplications: JobApplication[]) => (
    <ApplicationCardList
      applications={paginatedApplications}
      onApplicationsChange={loadApplications}
      onEdit={handleEdit}
    />
  );

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

        <Pagination
          items={applications}
          page={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          renderItems={renderApplications}
        />

        <ApplicationForm
          open={isFormOpen}
          application={selectedApplication}
          onClose={handleFormClose}
          onSave={loadApplications}
        />
      </Box>
    </Container>
  );
}; 