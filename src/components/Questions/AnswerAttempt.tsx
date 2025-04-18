import { useState } from 'react';

import { Alert, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';

import { useFeatureFlags } from '../../hooks/useFeatureFlags';

interface AnswerAttemptProps {
  question: string;
  correctAnswer: string;
  onComplete: (isCorrect: boolean) => void;
}

export const AnswerAttempt = ({ question, correctAnswer, onComplete }: AnswerAttemptProps) => {
  const { isFeatureEnabled } = useFeatureFlags();
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isFeatureEnabled('attempt_answer')) {
    return null;
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFeedback(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple keyword matching for now
    const userKeywords = userAnswer.toLowerCase().split(/\s+/);
    const correctKeywords = correctAnswer.toLowerCase().split(/\s+/);
    
    // Count matching keywords
    const matchingKeywords = userKeywords.filter(keyword => 
      correctKeywords.some(correct => correct.includes(keyword) || keyword.includes(correct))
    );

    // Consider it correct if at least 50% of keywords match
    const isCorrect = matchingKeywords.length / userKeywords.length >= 0.5;

    setFeedback({
      type: isCorrect ? 'success' : 'error',
      message: isCorrect 
        ? 'Good job! Your answer matches the key concepts.'
        : 'Your answer could be improved. Consider reviewing the key concepts.',
    });

    setIsSubmitting(false);
    onComplete(isCorrect);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Try to Answer
      </Typography>
      <Typography variant="body1" paragraph>
        {question}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type your answer here..."
        disabled={isSubmitting}
        sx={{ mb: 2 }}
      />
      {feedback && (
        <Alert severity={feedback.type} sx={{ mb: 2 }}>
          {feedback.message}
        </Alert>
      )}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!userAnswer.trim() || isSubmitting}
        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
      >
        {isSubmitting ? 'Assessing...' : 'Submit Answer'}
      </Button>
    </Paper>
  );
}; 