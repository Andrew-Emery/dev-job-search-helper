import { Box, Card, CardContent, useTheme, Typography, IconButton, Collapse, Divider } from "@mui/material"
import { ApplicationStatus, JobApplication, WorkLocation } from "../../db/types";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DuplicateIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { InfoChip } from '../Common/InfoChip';

const statusColors: Record<ApplicationStatus, 'info' | 'primary' | 'secondary' | 'warning' | 'success' | 'error' | 'default'> = {
    applied: 'info',
    screening: 'primary',
    technical: 'secondary',
    behavioral: 'warning',
    offer: 'success',
    rejected: 'error',
    accepted: 'success',
    withdrawn: 'default',
};

const workLocationColors: Record<WorkLocation, 'info' | 'primary' | 'secondary'> = {
    'remote': 'info',
    'hybrid': 'primary',
    'on-site': 'secondary',
};

interface ApplicationCardProps {
  app: JobApplication;
  handleDuplicate: (id: number) => void;
  handleEdit: (app: JobApplication) => void;
  handleDelete: (id: number) => void;
  isExpanded: boolean;
  onExpand: (id: number) => void;
}



export const ApplicationCard = ({ app, handleDuplicate, handleEdit, handleDelete, isExpanded, onExpand }: ApplicationCardProps) => {
    const theme = useTheme();
    const displayDate = app.lastEditedDate ? app.lastEditedDate : app.createdDate;
    const getDateChipLabel = (app: JobApplication) => {
        const isEdited = app.lastEditedDate;
        return `${isEdited ? 'Edited: ' : 'Created: '}${new Date(displayDate).toLocaleDateString()}`
    }
    return (
        <Card
          role="listitem"
          sx={{ 
            '&:hover': { 
              boxShadow: theme.palette.custom.cardHoverShadow 
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {app.role} at {app.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {app.location}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    <InfoChip
                      label={app.status}
                      color={statusColors[app.status]}
                    />
                    <InfoChip
                      label={app.workLocation}
                      color={workLocationColors[app.workLocation]}
                    />
                    <InfoChip
                      label={getDateChipLabel(app)}
                      variant="outlined"
                      tooltip={app.lastEditedDate ? `Created: ${new Date(app.createdDate).toLocaleDateString()}` : undefined}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => handleEdit(app)} title="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDuplicate(app.id!)} title="Duplicate">
                      <DuplicateIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(app.id!)} title="Delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => onExpand(app.id!)} 
                      title={isExpanded ? "Collapse" : "Expand"}
                      sx={{ 
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              <Collapse in={isExpanded}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {app.salary && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Salary</Typography>
                      <Typography>{app.salary}</Typography>
                    </Box>
                  )}
                  {app.contact && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Contact</Typography>
                      <Typography>{app.contact}</Typography>
                    </Box>
                  )}
                  {app.url && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Job URL</Typography>
                      <Typography 
                        component="a" 
                        href={app.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ 
                          color: theme.palette.primary.main,
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        {app.url}
                      </Typography>
                    </Box>
                  )}
                  {app.notes && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Notes</Typography>
                      <Typography>{app.notes}</Typography>
                    </Box>
                  )}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
    )
}
