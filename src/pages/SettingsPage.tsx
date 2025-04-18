import { Box, Stack, Typography } from '@mui/material';

import { DatabaseManagement } from '../components/Settings/DatabaseManagement';
import { FeatureFlags } from '../components/Settings/FeatureFlags';

const SettingsPage = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Stack spacing={3}>
        <FeatureFlags />
        <DatabaseManagement />
      </Stack>
    </Box>
  );
};

export default SettingsPage;
