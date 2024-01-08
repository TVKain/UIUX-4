import { Box, Typography, Divider } from '@mui/material';

import ResidentUpdateForm from '../../../features/staff/resident/ResidentUpdateForm';
export default function StaffResidentAdd() {
  return (
    <Box display='flex' flexDirection='column' padding={4} width={1} rowGap={4} height='100vh'>
      <Typography variant='h3' color='text' fontWeight={500}>
        Cập nhật cư dân
      </Typography>
      <Divider />
      <Typography variant='h5' color='text'>
        Thông tin cư dân
      </Typography>

      <ResidentUpdateForm />
    </Box>
  );
}
