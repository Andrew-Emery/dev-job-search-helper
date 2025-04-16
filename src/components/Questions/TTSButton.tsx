import { useState } from 'react';
import { IconButton, styled } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isPlaying',
})<{ isPlaying?: boolean }>(({ theme, isPlaying }) => ({
  padding: '8px',
  transition: 'all 0.2s ease-in-out',
  backgroundColor: 'transparent',
  color: isPlaying ? theme.palette.primary.main : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.custom.buttonHoverBg,
    transform: 'scale(1.1)',
  },
  '& svg': {
    fontSize: '1.5rem',
  },
}));

interface TTSButtonProps {
  text: string;
};

export const TTSButton: React.FC<TTSButtonProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <StyledIconButton
      onClick={handleSpeech}
      isPlaying={isPlaying}
      aria-label={`${isPlaying ? 'Stop' : 'Start'} text to speech`}
      size="small"
    >
      <VolumeUpIcon />
    </StyledIconButton>
  );
};
