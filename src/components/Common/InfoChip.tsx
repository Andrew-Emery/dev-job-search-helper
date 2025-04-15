import { Chip, Tooltip } from '@mui/material';
import { ReactElement } from 'react';

interface InfoChipProps {
  label: string;
  tooltip?: string;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  icon?: ReactElement;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
}

export const InfoChip = ({ 
  label, 
  tooltip, 
  color = 'default', 
  icon,
  variant = 'filled',
  size = 'small'
}: InfoChipProps) => {
  const chip = (
    <Chip
      label={label}
      color={color}
      icon={icon}
      variant={variant}
      style={{ textTransform: 'capitalize' }}
      size={size}
      sx={{ 
        '& .MuiChip-label': { 
          display: 'flex', 
          alignItems: 'center',
          gap: 0.5 
        } 
      }}
    />
  );

  return tooltip ? (
    <Tooltip title={tooltip}>
      {chip}
    </Tooltip>
  ) : chip;
}; 