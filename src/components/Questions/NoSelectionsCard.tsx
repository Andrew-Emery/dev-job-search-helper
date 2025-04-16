import { Card, CardContent, styled, Typography } from "@mui/material";
import FilterIcon from '@mui/icons-material/FilterAlt';



const NoSelections = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    border: `1px dashed ${theme.palette.text.secondary}`,
  }));

export const NoSelectionsCard = () => {
    return (
        <NoSelections>
            <CardContent>
            <FilterIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
            No Experience Levels Selected
            </Typography>
            <Typography color="text.secondary">
            Select one or more experience levels above to view interview questions
            </Typography>
        </CardContent>
      </NoSelections>
    )
}