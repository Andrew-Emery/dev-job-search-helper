import { AppBar, Toolbar, Typography, Box, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1280px',
  width: '100%',
  margin: '0 auto',
  padding: '0 2rem',
});

const NavLinks = styled(Box)({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
});

const NavLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  transition: 'background-color 0.2s ease',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.custom.buttonHoverBg,
  },
}));

export const Navigation = () => {

  return (
    <StyledAppBar>
      <StyledToolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          Frontend Dev Interview Helper
        </Typography>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/questions">Questions</NavLink>
        </NavLinks>
      </StyledToolbar>
    </StyledAppBar>
  );
};
