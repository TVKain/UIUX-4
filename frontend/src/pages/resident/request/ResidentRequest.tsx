import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import RequestTable from '../../../features/resident/request/RequestTable';

export default function ResidentRequest() {
  const navigate = useNavigate();

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Yêu cầu
      </Typography>

      <Divider />

      <Box>
        <Button
          variant='contained'
          onClick={() => {
            navigate('/resident/request/add');
          }}
        >
          Tạo yêu cầu
        </Button>
      </Box>

      <Box flexGrow={1}>
        <RequestTable />
      </Box>
    </Box>
  );
}
