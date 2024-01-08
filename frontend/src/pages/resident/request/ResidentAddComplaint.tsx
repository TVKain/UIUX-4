import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';

const ResidentAddComplaint = () => {
  const [nature, setNature] = useState();
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
  });

  const handleChangeNature = (event: any) => {
    setNature(event.target.value);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Box
        display='flex'
        alignItems='center'
        gap={4}
        p={3}
        borderBottom={1}
        borderColor='rgba(0, 0, 0, 0.12)'
      >
        <ArrowBackIosNewIcon />
        <Typography variant='h1' fontSize={40} fontWeight={600}>
          Thêm khiếu nại
        </Typography>
      </Box>

      <Box p={3}>
        <Typography variant='h2' fontSize={20} fontWeight={600}>
          Thông tin khiếu nại
        </Typography>

        <Stack mt={2} spacing={4}>
          <FormControl>
            <InputLabel id='select-nature-label'>Nature</InputLabel>
            <Select
              sx={{ width: 555 }}
              labelId='select-nature-label'
              id='select-nature'
              value={nature}
              label='Nature'
              onChange={handleChangeNature}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name='title'
            value={formData.title}
            onChange={handleChange}
            fullWidth
            label='Tiêu đề*'
            variant='outlined'
          />

          <TextField
            name='desc'
            value={formData.desc}
            onChange={handleChange}
            fullWidth
            label='Mô tả*'
            variant='outlined'
          />
        </Stack>

        <Stack mt={4}>
          <Button variant='contained' sx={{ marginLeft: 'auto' }}>
            Thêm khiếu nại
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ResidentAddComplaint;
