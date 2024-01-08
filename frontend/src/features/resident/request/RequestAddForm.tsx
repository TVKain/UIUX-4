import { useFormik } from 'formik';
import * as yup from 'yup';

import { CreateRequestInput, createRequest } from '../../../api/request/createRequest';
import { useLocalStorage } from '@uidotdev/usehooks';
import { User } from '../../../api/user/types';
import {
  Snackbar,
  Alert,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { useState } from 'react';

export default function RequestAddForm() {
  const [user, setUser] = useLocalStorage<User>('user', undefined);

  const formik = useFormik<CreateRequestInput>({
    initialValues: {
      title: '',
      description: '',
      UserId: user.id,
    },
    validationSchema: yup.object<CreateRequestInput>({
      title: yup.string().required('Tiêu đề không được để trống'),
      description: yup.string().required('Nội dung không được để trống'),
    }),

    onSubmit: async (values) => {
      try {
        await createRequest(values);

        formik.resetForm();

        setSnackbarOpen(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
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
          Tạo yêu cầu thành công
        </Alert>
      </Snackbar>

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
            id='description'
            name='description'
            label='Nội dung'
            variant='outlined'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>

        <Grid item xs={0}>
          <Button variant='contained' type='submit'>
            Tạo yêu cầu
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
