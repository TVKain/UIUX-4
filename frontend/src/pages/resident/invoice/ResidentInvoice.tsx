import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import InvoiceTable from '../../../features/resident/invoice/InvoiceTable';

export default function ResidentInvoice() {
  const navigate = useNavigate();

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Khoản thu
      </Typography>

      <Divider />

      <Box flexGrow={1}>
        <InvoiceTable />
      </Box>
    </Box>
  );
}
