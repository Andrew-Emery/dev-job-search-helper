import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Collapse,
  styled,
} from '@mui/material';
import { InterviewQuestion } from '../../types/types';
import { TTSButton } from './TTSButton';
import ExpandButton from './ExpandButton';
import { AnswerAttempt } from './AnswerAttempt';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.palette.custom.cardHoverShadow,
  },
}));

const CardHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
});

const ChipsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const QuestionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: '1.25rem',
  fontWeight: 500,
  lineHeight: 1.6,
  color: theme.palette.text.primary,
}));

const AnswerText = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  fontSize: '1rem',
  lineHeight: 1.5,
  color: theme.palette.text.secondary,
}));

const SeniorityChip = styled(Chip)<{ level: 'junior' | 'mid-level' | 'senior' }>(
  ({ theme, level }) => ({
    backgroundColor: level === 'junior'
      ? theme.palette.success.main
      : level === 'mid-level'
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
    color: level === 'junior'
      ? theme.palette.success.contrastText
      : level === 'mid-level'
        ? theme.palette.primary.contrastText
        : theme.palette.secondary.contrastText,
  })
);

const CategoryChip = styled(Chip)(({ theme }) => ({
  borderColor: theme.palette.border.main,
  color: theme.palette.text.primary,
  '&:hover': {
    borderColor: theme.palette.border.hover,
    backgroundColor: theme.palette.custom.buttonHoverBg,
  },
}));

interface QuestionCardProps {
  question: InterviewQuestion;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [expanded, setExpanded] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const handleAttemptComplete = (isCorrect: boolean) => {
    setHasAttempted(true);
    if (isCorrect) {
      setExpanded(true);
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <CardHeader>
          <ChipsContainer>
            <SeniorityChip
              label={question.seniority}
              size="small"
              level={question.seniority as 'junior' | 'mid-level' | 'senior'}
            />
            <CategoryChip 
              label={question.category} 
              size="small" 
              variant="outlined" 
            />
          </ChipsContainer>
          <TTSButton text={question.question} />
        </CardHeader>
        
        <QuestionText>
          {question.question}
        </QuestionText>

        <AnswerAttempt
          question={question.question}
          correctAnswer={question.answer}
          onComplete={handleAttemptComplete}
        />
      </CardContent>

      {<CardActions>
        <ExpandButton
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
          label={hasAttempted ? "View Answer" : "Show Answer"}
        />
      </CardActions>
}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <AnswerText>{question.answer}</AnswerText>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

export default QuestionCard; 