import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    currentAddress: '',
    absenceReason: '',
    startDate: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box
        sx={{
          '& > :not(style)': { mt: 2 },
        }}
      >
        <TextField
          name='currentAddress'
          value={formData.currentAddress}
          onChange={handleChange}
          fullWidth
          label='Địa chỉ hiện tại*'
          variant='outlined'
        />
        <TextField
          name='absenceReason'
          value={formData.absenceReason}
          onChange={handleChange}
          fullWidth
          label='Lý do vắng mặt tạm thời *'
          variant='outlined'
        />
        <DatePicker sx={{ width: '100%' }} label='Ngày bắt đầu' name='startDate' />
      </Box>

      <Stack mt={4}>
        <Button variant='contained' sx={{ marginLeft: 'auto' }}>
          Gửi yêu cầu
        </Button>
      </Stack>
    </>
  );
};

const AbsenceForm = () => {
  const [formData, setFormData] = useState({
    currentAddress: '',
    absenceReason: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box
        sx={{
          '& > :not(style)': { mt: 2 },
        }}
      >
        <TextField
          name='currentAddress'
          value={formData.currentAddress}
          onChange={handleChange}
          fullWidth
          label='Địa chỉ hiện tại*'
          variant='outlined'
        />
        <Stack direction='row' spacing={4}>
          <DatePicker
            sx={{ width: '100%' }}
            label='Ngày bắt đầu'
            name='startDate'
            onChange={handleChange}
          />
          <DatePicker
            sx={{ width: '100%' }}
            label='Ngày kết thúc'
            name='endDate'
            onChange={handleChange}
          />
        </Stack>
        <TextField
          name='absenceReason'
          value={formData.absenceReason}
          onChange={handleChange}
          fullWidth
          label='Lý do vắng mặt tạm thời *'
          variant='outlined'
        />
        <TextField fullWidth label='Địa chỉ đích *' variant='outlined' />
      </Box>

      <Stack mt={4}>
        <Button variant='contained' sx={{ marginLeft: 'auto' }}>
          Gửi yêu cầu
        </Button>
      </Stack>
    </>
  );
};

const FORM_TYPES = {
  REGISTRATION: 'REGISTRATION',
  ABSENCE: 'ABSENCE',
};
const ResidentDeclaration = () => {
  const [selectedFormType, setSelectedFormType] = useState(FORM_TYPES.REGISTRATION);

  const handleChange = (event: any) => {
    setSelectedFormType(event.target.value);
  };

  return (
    <Box>
      <Typography
        variant='h1'
        fontSize={40}
        fontWeight={600}
        borderBottom={1}
        p={3}
        borderColor='rgba(0, 0, 0, 0.12)'
      >
        Tờ khai thường trú
      </Typography>

      <Box p={3}>
        <Typography variant='h2' fontSize={20} fontWeight={600}>
          Tờ khai
        </Typography>

        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <FormLabel id='declaration-radio-buttons-group-label'>Chọn Mẫu tờ khai *:</FormLabel>
          <RadioGroup
            row
            aria-labelledby='declaration-radio-buttons-group-label'
            value={selectedFormType}
            onChange={handleChange}
            name='radio-buttons-group'
          >
            <FormControlLabel
              value={FORM_TYPES.REGISTRATION}
              control={<Radio />}
              label='Đăng ký tạm thời'
            />
            <FormControlLabel
              value={FORM_TYPES.ABSENCE}
              control={<Radio />}
              label='Vắng mặt tạm thời'
            />
          </RadioGroup>
        </FormControl>

        {selectedFormType === FORM_TYPES.REGISTRATION ? <RegistrationForm /> : <AbsenceForm />}
      </Box>
    </Box>
  );
};

export default ResidentDeclaration;
