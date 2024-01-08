import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ResidentTable from '../../../features/staff/resident/ResidentTable';

export default function StaffResident() {
  const navigate = useNavigate();

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Cư dân
      </Typography>

      <Divider />

      <Box>
        <Button
          variant='contained'
          onClick={() => {
            navigate('/staff/resident/add');
          }}
        >
          Thêm cư dân
        </Button>
      </Box>

      <Box flex={1}>
        <ResidentTable />
      </Box>
    </Box>
  );
}
