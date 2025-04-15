import { Box, Chip, styled, Tooltip, Typography } from "@mui/material";
import { SeniorityLevel } from "../../types/types";

const InstructionText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    marginBottom: theme.spacing(1),
  }));

const SeniorityChipSelector = styled(Chip, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ 
    level: 'junior' | 'mid-level' | 'senior';
    isSelected: boolean;
  }>(({ theme, level, isSelected }) => ({
    backgroundColor: isSelected
      ? (level === 'junior'
        ? theme.palette.success.main
        : level === 'mid-level'
          ? theme.palette.primary.main
          : theme.palette.secondary.main)
      : theme.palette.background.paper,
    color: isSelected
      ? (level === 'junior'
        ? theme.palette.success.contrastText
        : level === 'mid-level'
          ? theme.palette.primary.contrastText
          : theme.palette.secondary.contrastText)
      : theme.palette.text.secondary,
    border: `1px solid ${
      isSelected
        ? 'transparent'
        : (level === 'junior'
          ? theme.palette.success.main
          : level === 'mid-level'
            ? theme.palette.primary.main
            : theme.palette.secondary.main)
    }`,
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: isSelected
        ? (level === 'junior'
          ? theme.palette.success.dark
          : level === 'mid-level'
            ? theme.palette.primary.dark
            : theme.palette.secondary.dark)
        : theme.palette.action.hover,
    },
  }));

const getChipTooltip = (level: SeniorityLevel, isSelected: boolean) => {
  if (isSelected) {
    return `Click to remove ${level} level questions`;
  }
  return `Click to add ${level} level questions`;
};

interface SelectLevelProps {
  selectedLevels: SeniorityLevel[];
  onChange: (newSelection: SeniorityLevel[]) => void;
}

export const SelectLevel = ({ selectedLevels, onChange }: SelectLevelProps) => {
  const allLevels: SeniorityLevel[] = ['junior', 'mid-level', 'senior'];
  
  const handleChipClick = (level: SeniorityLevel) => {
    if (selectedLevels.includes(level)) {
      onChange(selectedLevels.filter(l => l !== level));
    } else {
      onChange([...selectedLevels, level]);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <InstructionText>
        Select experience levels to filter questions:
      </InstructionText>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {allLevels.map((level) => {
          const isSelected = selectedLevels.includes(level);
          return (
            <Tooltip 
              key={level}
              title={getChipTooltip(level, isSelected)}
              arrow
            >
              <div>
                <SeniorityChipSelector
                  label={level}
                  level={level}
                  isSelected={isSelected}
                  onClick={() => handleChipClick(level)}
                />
              </div>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
