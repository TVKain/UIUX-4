import { Box, Typography, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import InvoiceTable from '../../../features/staff/invoice/InvoiceTable';

export default function StaffInvoice() {
  const navigate = useNavigate();

  return (
    <Box display='flex' padding={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Khoản thu
      </Typography>

      <Divider />

      <Box>
        <Button variant='contained' onClick={() => navigate('/staff/invoice/add')}>
          Tạo khoản thu
        </Button>
      </Box>

      <Box flex={1}>
        <InvoiceTable />
      </Box>
    </Box>
  );
}
