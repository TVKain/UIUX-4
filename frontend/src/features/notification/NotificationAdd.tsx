import { Box, Typography, Divider, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  createNotification,
  CreateNotificationRequest,
} from '../../api/notification/createNotification';
import { useLocalStorage } from '@uidotdev/usehooks';
import { User } from '../../api/user/types';
import { useState } from 'react';

interface NotificationForm {
  title: string;
  content: string;
}

export default function NotificationAdd() {
  const [user, setUser] = useLocalStorage<User>('user');

  const formik = useFormik<NotificationForm>({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: yup.object<NotificationForm>({
      title: yup.string().required('Tiêu đề không được để trống'),
      content: yup.string().required('Nội dung không được để trống'),
    }),
    onSubmit: async (values) => {
      let notification: CreateNotificationRequest = {
        title: values.title,
        content: values.content,
        UserId: user.id,
      };

      try {
        await createNotification(notification);
        formik.resetForm();
        setSnackbarOpen(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <Grid container spacing={4} justifyContent='flex-end'>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='title'
            name='title'
            label='Tiêu đề'
            variant='outlined'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id='content'
            name='content'
            label='Nội dung'
            variant='outlined'
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
        </Grid>

        <Grid item xs={0}>
          <Button variant='contained' onClick={() => formik.handleSubmit()}>
            Tạo thông báo
          </Button>
        </Grid>
      </Grid>
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
          Tạo thông báo thành công
        </Alert>
      </Snackbar>
    </>
  );
}
