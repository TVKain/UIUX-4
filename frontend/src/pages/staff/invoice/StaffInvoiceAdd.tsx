import {
  Box,
  Typography,
  Divider,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import InvoiceAddForm from '../../../features/staff/invoice/InvoiceAddForm';

export default function StaffInvoiceAdd() {
  return (
    <Box display='flex' padding={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Tạo khoản thu
      </Typography>

      <Divider />

      <Box flex={1}>
        <InvoiceAddForm />
      </Box>
    </Box>
  );
}
