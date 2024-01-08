import {
  FormControl,
  TextField,
  Typography,
  Box,
  Grid,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';

import { useFormik } from 'formik';
import React, { useEffect } from 'react';

import { getInvoices } from '../../../api/invoice/getInvoices';
import { Invoice } from '../../../api/invoice/types';

import * as yup from 'yup';
import InvoiceApartmentTable from './InvoiceApartmentTable';

import {
  CreateInvoiceForApartmentsRequest,
  createInvoiceForApartments,
} from '../../../api/invoice-apartment/createInvoiceForApartments';
type InvoiceApartmentAddFormProps = {
  InvoiceId: number | undefined;
  ApartmentIds: number[];
  period: string;
  amount: number;
};

const periods = [
  {
    value: 'onetime',
    name: 'Một lần',
  },
  {
    value: 'monthly',
    name: 'Hàng tháng',
  },
  { value: 'quarterly', name: 'Hàng quý' },
  { value: 'yearly', name: 'Hàng năm' },
];

export default function InvoiceAddForm() {
  const [invoiceTypes, setInvoiceTypes] = React.useState<Invoice[]>([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  useEffect(() => {
    async function fetchInvoiceTypes() {
      const res = await getInvoices();
      setInvoiceTypes(res);
    }

    fetchInvoiceTypes();
  }, []);

  const formik = useFormik<InvoiceApartmentAddFormProps>({
    initialValues: {
      InvoiceId: 1,
      ApartmentIds: [],
      amount: 0,
      period: 'monthly',
    },
    validationSchema: yup.object<InvoiceApartmentAddFormProps>({
      InvoiceId: yup.number().required(),
      ApartmentIds: yup.array().min(1, 'Phải chọn ít nhất một căn hộ'),
      amount: yup
        .number()
        .required('Số tiền không được để trống')
        .moreThan(0, 'Số tiền phải lớn hơn 0'),
    }),
    onSubmit: async (values) => {
      const result = createInvoiceForApartments(values as CreateInvoiceForApartmentsRequest);
      setSnackbarOpen(true);
      formik.resetForm();
    },
  });

  return (
    <Box display='flex' flexDirection='column' gap={4} height={1}>
      <Grid container spacing={4} justifyContent='flex-end'>
        <Grid item xs={12}>
          <Typography variant='h5' color='text'>
            Thông tin khoản thu
          </Typography>
        </Grid>

        <Grid item xs={6}>
          {invoiceTypes.length !== 0 && (
            <FormControl fullWidth>
              <InputLabel id='invoice-select-label'>Loại khoản thu</InputLabel>
              <Select
                label='Loại khoản thu'
                value={formik.values.InvoiceId}
                onChange={(event) => {
                  formik.setFieldValue('InvoiceId', event.target.value);
                }}
              >
                {invoiceTypes.map((invoice) => (
                  <MenuItem key={invoice.id} value={invoice.id}>
                    {invoice.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id='invoice-select-label'>Kỳ hạn</InputLabel>
            <Select
              label='Kỳ hạn'
              value={formik.values.period}
              onChange={(event) => {
                formik.setFieldValue('period', event.target.value);
              }}
            >
              {periods.map((period) => (
                <MenuItem key={period.value} value={period.value}>
                  {period.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Số tiền'
            type='number'
            InputProps={{
              endAdornment: 'đ',
            }}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            value={formik.values.amount}
            onChange={formik.handleChange('amount')}
          />
        </Grid>
      </Grid>

      <Box flex={0.75} display='flex' flexDirection='column' gap={4}>
        <Typography variant='h5' color='text'>
          Các căn hộ áp dụng
        </Typography>

        <InvoiceApartmentTable formik={formik} />
        <Typography
          sx={{
            color: 'red',
            display: formik.touched.ApartmentIds && formik.errors.ApartmentIds ? 'block' : 'none',
          }}
        >
          {formik.touched.ApartmentIds && formik.errors.ApartmentIds}
        </Typography>
        <Box alignSelf='end'>
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
            variant='contained'
          >
            Tạo khoản thu
          </Button>
        </Box>
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
          Thêm khoản thu thành công
        </Alert>
      </Snackbar>
    </Box>
  );
}
