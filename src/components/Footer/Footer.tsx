import { styled } from '@mui/material';
import { useTheme } from '../../providers/ThemeProvider';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

const StyledFooter = styled('footer')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '24px 0',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  borderTop: `1px solid ${theme.palette.border.main}`,
  zIndex: theme.zIndex.appBar,
}));

const FooterContent = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
  padding: '0 24px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const Copyright = styled('p')(() => ({
  margin: 0,
}));

export const Footer = () => {
  const { mode, toggleTheme } = useTheme();
  const isDarkMode = mode === 'dark';

  return (
    <StyledFooter>
      <FooterContent>
        <Copyright>
          © {new Date().getFullYear()} Frontend Dev Interview Helper. All rights reserved.
        </Copyright>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </FooterContent>
    </StyledFooter>
  );
};
