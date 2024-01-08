import ApartmentUpdateForm from '../../../features/staff/apartment/ApartmentUpdateForm';
import { Box, Typography, Divider } from '@mui/material';

export default function StaffApartmentUpdate() {
  return (
    <Box display='flex' flexDirection='column' padding={4} width={1} rowGap={4} height='100vh'>
      <Typography variant='h3' color='text' fontWeight={500}>
        Cập nhật căn hộ
      </Typography>

      <Divider />

      <Typography variant='h5' color='text'>
        Thông tin căn hộ
      </Typography>

      <ApartmentUpdateForm />
    </Box>
  );
}
