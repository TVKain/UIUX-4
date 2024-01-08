import { Box, Typography, Divider, Button } from '@mui/material';
import ApartmentTable from '../../../features/staff/apartment/ApartmentTable';
import { useNavigate } from 'react-router-dom';

export default function StaffApartment() {
  const navigate = useNavigate();

  return (
    <Box display='flex' flexDirection='column' padding={4} rowGap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Căn hộ
      </Typography>

      <Divider />

      <Box>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            navigate('/staff/apartment/add');
          }}
        >
          Thêm căn hộ
        </Button>
      </Box>

      <Box flex={1}>
        <ApartmentTable />
      </Box>
    </Box>
  );
}
