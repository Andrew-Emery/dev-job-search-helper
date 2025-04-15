import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import { JobApplication, ApplicationStatus, WorkLocation } from '../../db/types';
import { addApplication, updateApplication } from '../../db/db';

interface ApplicationFormProps {
  application?: JobApplication | null;
  onClose: () => void;
}

interface FormErrors {
  company?: string;
  role?: string;
  location?: string;
  workLocation?: string;
  status?: string;
}

export const ApplicationForm = ({ application, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    company: '',
    role: '',
    location: '',
    workLocation: 'remote',
    status: 'applied',
    createdDate: new Date().toISOString(),
    notes: '',
    salary: '',
    contact: '',
    url: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (application) {
      setFormData({
        ...application,
        lastEditedDate: new Date().toISOString(),
      });
    }
  }, [application]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.company?.trim()) {
      newErrors.company = 'Company is required';
    }
    if (!formData.role?.trim()) {
      newErrors.role = 'Role is required';
    }
    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.workLocation) {
      newErrors.workLocation = 'Work location is required';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (application) {
      await updateApplication(application.id!, formData as JobApplication);
    } else {
      await addApplication(formData as JobApplication);
    }
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{application ? 'Edit Application' : 'Add Application'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            error={!!errors.company}
            helperText={errors.company}
            required
          />
          <TextField
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            error={!!errors.role}
            helperText={errors.role}
            required
          />
          <TextField
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            error={!!errors.location}
            helperText={errors.location}
            required
          />
          <TextField
            select
            label="Work Location"
            value={formData.workLocation}
            onChange={(e) => setFormData({ ...formData, workLocation: e.target.value as WorkLocation })}
            error={!!errors.workLocation}
            helperText={errors.workLocation}
            required
          >
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
            <MenuItem value="on-site">On-site</MenuItem>
          </TextField>
          <TextField
            select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ApplicationStatus })}
            error={!!errors.status}
            helperText={errors.status}
            required
          >
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="screening">Screening</MenuItem>
            <MenuItem value="technical">Technical</MenuItem>
            <MenuItem value="behavioral">Behavioral</MenuItem>
            <MenuItem value="offer">Offer</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="withdrawn">Withdrawn</MenuItem>
          </TextField>
          <TextField
            label="Salary"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />
          <TextField
            label="Contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />
          <TextField
            label="Job URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
          <TextField
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {application ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 