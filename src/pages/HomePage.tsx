import { Container, styled, Typography } from '@mui/material';

import { ActionButton } from '../components/Common/ActionButton';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700,
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: '600px',
  color: theme.palette.text.secondary,
}));

const HomePage = () => {
  return (
    <StyledContainer maxWidth="md">
      <Title variant="h2">
        Frontend Developer Interview Practice
      </Title>
      <Subtitle variant="h6">
        Practice common interview questions, improve your skills, and prepare for your next frontend developer interview.
      </Subtitle>
      <ActionButton to="/questions">
        Start Practicing
      </ActionButton>
    </StyledContainer>
  );
}

export default HomePage;
