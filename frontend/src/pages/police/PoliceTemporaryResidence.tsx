import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ResidentTable from '../../features/police/resident/ResidentTable';
import TemporaryResidenceTable from '../../features/police/temporary-residence/TemporaryResidenceTable';

export default function PoliceTemporaryResidence() {
  const navigate = useNavigate();

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Khai báo tạm trú
      </Typography>

      <Divider />

      <Box flex={1}>
        <TemporaryResidenceTable />
      </Box>
    </Box>
  );
}
