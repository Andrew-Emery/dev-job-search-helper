import { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';

import { NoSelectionsCard } from '../components/Questions/NoSelectionsCard';
import QuestionCard from '../components/Questions/QuestionCard';
import { SelectLevel } from '../components/Questions/SelectLevel';
import { interviewQuestions } from '../data/questions';
import { SeniorityLevel } from '../types/types';

const QuestionsPage = () => {
  const [selectedLevels, setSelectedLevels] = useState<SeniorityLevel[]>(['junior']);

  const filteredQuestions = interviewQuestions.filter(q => 
    selectedLevels.includes(q.seniority)
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ mb: 4 }}
        >
          Frontend Developer Interview Practice
        </Typography>
        <SelectLevel 
          selectedLevels={selectedLevels} 
          onChange={setSelectedLevels} 
        />
        

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {selectedLevels.length === 0 ? (
            <NoSelectionsCard />
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default QuestionsPage;