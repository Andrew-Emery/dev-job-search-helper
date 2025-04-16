import { Button, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '1rem',
  borderColor: theme.palette.border.main,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.custom.buttonHoverBg,
    borderColor: theme.palette.border.hover,
  },
  '&:focus': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

const StyledIcon = styled(ExpandMoreIcon, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(({ theme, expanded }) => ({
  transition: 'transform 0.3s ease-in-out',
  fontSize: '1.5rem',
  transform: expanded ? 'rotate(180deg)' : 'none',
  color: theme.palette.text.primary,
}));

interface ExpandButtonProps {
  expanded: boolean;
  onToggle: () => void;
  label: string;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({ expanded, onToggle, label }) => {
  return (
    <StyledButton
      onClick={onToggle}
      variant="outlined"
      fullWidth
      aria-expanded={expanded}
      aria-label={`${label} - Click to ${expanded ? 'hide' : 'show'} answer`}
      endIcon={<StyledIcon expanded={expanded} />}
    >
      {label}
    </StyledButton>
  );
};

export default ExpandButton; 