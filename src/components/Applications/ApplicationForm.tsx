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
import { JobApplication } from '../../db/types';
import { addApplication, updateApplication } from '../../db/db';

interface ApplicationFormProps {
  open: boolean;
  application?: JobApplication | null;
  onClose: () => void;
  onSave: () => void;
}

interface FormErrors {
  company?: string;
  role?: string;
  location?: string;
  workLocation?: string;
  status?: string;
  salary?: string;
  contact?: string;
  url?: string;
}

export const ApplicationForm = ({ open, application, onClose, onSave }: ApplicationFormProps) => {
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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (application) {
      setFormData({
        ...application,
        lastEditedDate: new Date().toISOString(),
      });
    }
  }, [application]);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'company':
        if (!formData.company?.trim()) {
          newErrors.company = 'Company is required';
        } else {
          delete newErrors.company;
        }
        break;
      case 'role':
        if (!formData.role?.trim()) {
          newErrors.role = 'Role is required';
        } else {
          delete newErrors.role;
        }
        break;
      case 'location':
        if (!formData.location?.trim()) {
          newErrors.location = 'Location is required';
        } else {
          delete newErrors.location;
        }
        break;
      case 'workLocation':
        if (!formData.workLocation) {
          newErrors.workLocation = 'Work location is required';
        } else {
          delete newErrors.workLocation;
        }
        break;
      case 'status':
        if (!formData.status) {
          newErrors.status = 'Status is required';
        } else {
          delete newErrors.status;
        }
        break;
      case 'salary':
        if (!formData.salary?.trim()) {
          newErrors.salary = 'Salary is required';
        } else {
          delete newErrors.salary;
        }
        break;
      case 'contact':
        if (!formData.contact?.trim()) {
          newErrors.contact = 'Contact is required';
        } else {
          delete newErrors.contact;
        }
        break;
      case 'url':
        if (!formData.url?.trim()) {
          newErrors.url = 'Job URL is required';
        } else {
          delete newErrors.url;
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[field as keyof FormErrors];
  };

  const validateForm = (): boolean => {
    const fields = ['company', 'role', 'location', 'workLocation', 'status', 'salary', 'contact', 'url'];
    let isValid = true;
    
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    setTouched(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    return isValid;
  };

  const handleChange = (field: keyof FormErrors) => (
    e: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field);
    }
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
    onSave();
  };

  const handleClose = () => {
    onClose();
    onSave();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {application ? 'Edit Application' : 'Add Application'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Company"
            value={formData.company}
            onChange={handleChange('company')}
            onBlur={() => handleBlur('company')}
            error={touched.company && !!errors.company}
            helperText={touched.company && errors.company}
            required
          />
          <TextField
            label="Role"
            value={formData.role}
            onChange={handleChange('role')}
            onBlur={() => handleBlur('role')}
            error={touched.role && !!errors.role}
            helperText={touched.role && errors.role}
            required
          />
          <TextField
            label="Location"
            value={formData.location}
            onChange={handleChange('location')}
            onBlur={() => handleBlur('location')}
            error={touched.location && !!errors.location}
            helperText={touched.location && errors.location}
            required
          />
          <TextField
            select
            label="Work Location"
            value={formData.workLocation}
            onChange={handleChange('workLocation')}
            onBlur={() => handleBlur('workLocation')}
            error={touched.workLocation && !!errors.workLocation}
            helperText={touched.workLocation && errors.workLocation}
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
            onChange={handleChange('status')}
            onBlur={() => handleBlur('status')}
            error={touched.status && !!errors.status}
            helperText={touched.status && errors.status}
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
            onChange={handleChange('salary')}
            onBlur={() => handleBlur('salary')}
            error={touched.salary && !!errors.salary}
            helperText={touched.salary && errors.salary}
            required
          />
          <TextField
            label="Contact"
            value={formData.contact}
            onChange={handleChange('contact')}
            onBlur={() => handleBlur('contact')}
            error={touched.contact && !!errors.contact}
            helperText={touched.contact && errors.contact}
            required
          />
          <TextField
            label="Job URL"
            value={formData.url}
            onChange={handleChange('url')}
            onBlur={() => handleBlur('url')}
            error={touched.url && !!errors.url}
            helperText={touched.url && errors.url}
            required
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 