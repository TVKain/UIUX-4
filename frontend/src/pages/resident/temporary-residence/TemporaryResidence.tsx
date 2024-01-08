import { Alert, Box, Button, Divider, Snackbar, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';

import {
  createTemporaryResidence,
  CreateTemporaryResidenceRequest,
} from '../../../api/temporary-residence/createTemporaryResidence';

import { getUserInfos, GetUserInfoResponse } from '../../../api/user-info/getUserInfos';

import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { User } from '../../../api/user/types';

import dayjs from 'dayjs';

import * as yup from 'yup';

export default function TemporaryResidence() {
  const [user, setUser] = useLocalStorage<User>('user');

  const formik = useFormik<CreateTemporaryResidenceRequest>({
    initialValues: {
      permanentAddress: '',
      currentAddress: '',
      startDate: dayjs().format('YYYY-MM-DD'),
      reason: '',
      UserInfoId: -1,
    },
    validationSchema: yup.object<CreateTemporaryResidenceRequest>({
      permanentAddress: yup.string().required('Địa chỉ thường trú không được để trống'),
      currentAddress: yup.string().required('Địa chỉ hiện tại không được để trống'),
      startDate: yup.string().required('Ngày bắt đầu không được để trống'),
      reason: yup.string().required('Lý do không được để trống'),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        await createTemporaryResidence(values);

        const userInfoId = values.UserInfoId;

        formik.resetForm();
        formik.setFieldValue('UserInfoId', userInfoId);

        setSnackbarOpen(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    async function setUp() {
      const userInfos = await getUserInfos();
      const userInfo = userInfos.find((userInfo) => userInfo.UserId === user?.id)!;

      formik.setFieldValue('UserInfoId', userInfo.id);
    }

    setUp();
  }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (formik.values.UserInfoId === -1) {
    return null;
  }

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Khai báo tạm trú
      </Typography>

      <Divider />

      <Typography variant='h5' color='text'>
        Biểu mẫu khai báo
      </Typography>

      <Box display='flex' flexDirection='column' gap={4}>
        <TextField
          label='Địa chỉ thường trú'
          fullWidth
          name='permanentAddress'
          value={formik.values.permanentAddress}
          onChange={formik.handleChange('permanentAddress')}
          helperText={formik.touched.permanentAddress && formik.errors.permanentAddress}
          error={formik.touched.permanentAddress && Boolean(formik.errors.permanentAddress)}
        />
        <TextField
          label='Địa chỉ hiện tại'
          fullWidth
          name='currentAddress'
          value={formik.values.currentAddress}
          onChange={formik.handleChange('currentAddress')}
          helperText={formik.touched.currentAddress && formik.errors.currentAddress}
          error={formik.touched.currentAddress && Boolean(formik.errors.currentAddress)}
        />

        <DatePicker
          label='Ngày bắt đầu'
          orientation='landscape'
          slotProps={{ textField: { fullWidth: true, contentEditable: false } }}
          value={dayjs(formik.values.startDate)}
          onChange={(date) => {
            formik.setFieldValue('startDate', date?.format('YYYY-MM-DD'));
          }}
        />

        <TextField
          label='Lý do'
          fullWidth
          name='reason'
          value={formik.values.reason}
          onChange={formik.handleChange('reason')}
          error={formik.touched.reason && Boolean(formik.errors.reason)}
          helperText={formik.touched.reason && formik.errors.reason}
        />
        <Button
          variant='contained'
          sx={{
            alignSelf: 'flex-end',
          }}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Khai báo tạm trú
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={(_event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setSnackbarOpen(false);
        }}
      >
        <Alert severity='success' sx={{ width: '100%' }}>
          Khai báo tạm trú thành công
        </Alert>
      </Snackbar>
    </Box>
  );
}
