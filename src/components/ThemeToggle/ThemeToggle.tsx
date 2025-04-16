import { IconButton, Tooltip, styled } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.custom.buttonHoverBg,
    transform: 'rotate(30deg)',
  },
  '& svg': {
    fontSize: '1.5rem',
    color: theme.palette.text.primary,
  },
}));

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
      <StyledIconButton
        onClick={onToggle}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </StyledIconButton>
    </Tooltip>
  );
};
