import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MemberTable from '../../../features/resident/member/MemberTable';

export default function ResidentInvoice() {
  const navigate = useNavigate();

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Thành viên
      </Typography>

      <Divider />

      <Box flexGrow={1}>
        <MemberTable />
      </Box>
    </Box>
  );
}
