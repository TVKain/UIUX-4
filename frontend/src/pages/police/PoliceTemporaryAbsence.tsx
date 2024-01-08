import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import TemporaryAbsenceTable from '../../features/police/temporary-absence/TemporaryAbsenceTable';

export default function PoliceTemporaryAbsence() {
  const navigate = useNavigate();

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Khai báo tạm vắng
      </Typography>

      <Divider />

      <Box flex={1}>
        <TemporaryAbsenceTable />
      </Box>
    </Box>
  );
}
