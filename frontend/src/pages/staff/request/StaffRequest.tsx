import { Box, Typography, Divider } from '@mui/material';

import RequestTable from '../../../features/staff/request/RequestTable';

export default function StaffInvoice() {
  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Xử lý yêu cầu
      </Typography>

      <Divider />

      <RequestTable />
    </Box>
  );
}
