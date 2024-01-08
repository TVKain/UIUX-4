import { Box, Button, Divider, Typography } from '@mui/material';

import RequestAddForm from '../../../features/resident/request/RequestAddForm';

export default function ResidentAddRequest() {
  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Tạo yêu cầu
      </Typography>

      <Divider />

      <Typography variant='h5' color='text'>
        Thông tin yêu cầu
      </Typography>

      <RequestAddForm />
    </Box>
  );
}
