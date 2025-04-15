import { Button, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(1.5, 3),
  fontWeight: 500,
  transition: theme.transitions.create(['transform', 'box-shadow', 'background-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.custom.cardHoverShadow,
    backgroundColor: theme.palette.custom.buttonHoverBg,
  },
}));

interface ActionButtonProps {
  to?: string;
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick?: () => void;
  className?: string;
}

export const ActionButton = ({ 
  to, 
  children, 
  variant = 'contained',
  size = 'large',
  ...props 
}: ActionButtonProps) => {
  const buttonProps = {
    variant,
    size,
    ...props,
    ...(to ? {
      component: RouterLink,
      to,
    } : {}),
  } as const;

  return (
    <StyledButton {...buttonProps}>
      {children}
    </StyledButton>
  );
}; 