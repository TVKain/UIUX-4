import {
  Autocomplete,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Alert,
  Snackbar,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import genders from '../../../assets/genders';
import { GetBuildingsResponse, getBuildings } from '../../../api/building/getBuildings';
import { CreateUserInfoRequest, createUserInfo } from '../../../api/user-info/createUserInfo';

interface CreateUserInfoFormProps {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: Dayjs;
  email: string;
  phone: string;
  city: string;
  district: string;
  subdistrict: string;
  address: string;
  ApartmentId?: number;
  BuildingId?: number;
  account: boolean;
}

function toCreateUserInfoRequest(values: CreateUserInfoFormProps): CreateUserInfoRequest {
  let temp = values;
  delete temp['BuildingId'];

  return {
    ...temp,
    birthday: values.birthday.toISOString(),
    ApartmentId: values.ApartmentId!,
  };
}

const ResidentAddForm = () => {
  const [buildings, setBuildings] = useState<GetBuildingsResponse>([]);

  const formik = useFormik<CreateUserInfoFormProps>({
    initialValues: {
      firstName: '',
      lastName: '',
      birthday: dayjs(),
      gender: genders[0],
      email: '',
      phone: '',
      city: '',
      district: '',
      subdistrict: '',
      address: '',
      account: false,
      ApartmentId: undefined,
      BuildingId: undefined,
    },
    validationSchema: yup.object({
      firstName: yup.string().required('Họ không được để trống'),
      lastName: yup.string().required('Tên không được để trống'),
      birthday: yup.date().required('Ngày sinh không được để trống'),
      email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
      phone: yup
        .string()
        .test('isNumber', 'Số điện thoại không hợp lệ', (value) => {
          return Number.isInteger(Number(value));
        })
        .min(9, 'Số điện thoại có ít nhất 9 chữ số')
        .max(11, 'Số điện thoại có nhiều nhất 11 chữ số')

        .required('Số điện thoại không được để trống'),
      city: yup.string().required('Tỉnh/Thành phố không được để trống'),
      district: yup.string().required('Quận/Huyện không được để trống'),
      subdistrict: yup.string().required('Phường không được để trống'),
      address: yup.string().required('Địa chỉ không được để trống'),
      account: yup.boolean(),
      ApartmentId: yup.number().required('Căn hộ không được để trống'),
      BuildingId: yup.number().required('Chung cư không được để trống'),
    }),

    onSubmit: async (values) => {
      try {
        const result = await createUserInfo(toCreateUserInfoRequest(values));

        setSnackbarOpen(true);
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await getBuildings();
      setBuildings(response);
    };

    fetchBuildings();
  }, []);

  console.log(formik.values);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4} justifyContent='flex-end'>
        <Grid item xs={6}>
          <TextField
            onChange={formik.handleChange('lastName')}
            value={formik.values.lastName}
            fullWidth
            label='Họ'
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={formik.handleChange('firstName')}
            value={formik.values.firstName}
            fullWidth
            label='Tên'
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>

        <Grid item xs={6}>
          <DatePicker
            value={formik.values.birthday}
            onChange={(newValue) => {
              formik.setFieldValue('birthday', newValue);
            }}
            label='Ngày sinh'
            orientation='landscape'
            slotProps={{ textField: { fullWidth: true, contentEditable: false } }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id='gender-label'>Giới tính</InputLabel>
            <Select
              labelId='gender-label'
              id='gender'
              label='Giới tính'
              value={formik.values.gender}
              onChange={(event) => {
                formik.setFieldValue('gender', event.target.value);
              }}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            value={formik.values.phone}
            onChange={formik.handleChange('phone')}
            fullWidth
            label='Số điện thoại'
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={formik.handleChange('email')}
            value={formik.values.email}
            fullWidth
            label='Email'
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h5'>Thông tin địa chỉ</Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField
            onChange={formik.handleChange('city')}
            value={formik.values.city}
            fullWidth
            label='Tỉnh/Thành phố'
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            onChange={formik.handleChange('district')}
            value={formik.values.district}
            fullWidth
            label='Quận/Huyện'
            error={formik.touched.district && Boolean(formik.errors.district)}
            helperText={formik.touched.district && formik.errors.district}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            onChange={formik.handleChange('subdistrict')}
            value={formik.values.subdistrict}
            fullWidth
            label='Xã/Phường'
            error={formik.touched.subdistrict && Boolean(formik.errors.subdistrict)}
            helperText={formik.touched.subdistrict && formik.errors.subdistrict}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            onChange={formik.handleChange('address')}
            value={formik.values.address}
            fullWidth
            label='Địa chỉ chi tiết'
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h5'>Thông tin căn hộ</Typography>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel
              id='building-label'
              error={formik.touched.BuildingId && Boolean(formik.errors.BuildingId)}
            >
              Chung cư
            </InputLabel>
            <Select
              labelId='building-label'
              id='building'
              label='Chung cư'
              value={formik.values.BuildingId ? formik.values.BuildingId : ''}
              onChange={(event) => {
                formik.setFieldValue('BuildingId', event.target.value);
                formik.setFieldValue('ApartmentId', undefined);
              }}
              error={formik.touched.BuildingId && Boolean(formik.errors.BuildingId)}
            >
              {buildings.map((building) => (
                <MenuItem key={building.id} value={building.id}>
                  {building.name}
                </MenuItem>
              ))}
            </Select>

            {formik.touched.BuildingId && (
              <FormHelperText
                error={formik.touched.BuildingId && Boolean(formik.errors.BuildingId)}
              >
                {formik.errors.BuildingId}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel
              id='apartment-label'
              error={formik.touched.ApartmentId && Boolean(formik.errors.ApartmentId)}
            >
              Căn hộ
            </InputLabel>
            <Select
              labelId='apartment-label'
              id='apartment'
              label='Căn hộ'
              value={formik.values.ApartmentId ? formik.values.ApartmentId : ''}
              onChange={(event) => {
                formik.setFieldValue('ApartmentId', event.target.value);
              }}
              error={formik.touched.ApartmentId && Boolean(formik.errors.ApartmentId)}
            >
              {buildings.length !== 0 &&
                formik.values.BuildingId &&
                buildings
                  .find((building) => building.id === formik.values.BuildingId)!
                  .Apartments.map((apartment) => {
                    return (
                      <MenuItem key={apartment.id} value={apartment.id}>
                        {apartment.name}
                      </MenuItem>
                    );
                  })}
            </Select>
            {formik.touched.ApartmentId && (
              <FormHelperText
                error={formik.touched.ApartmentId && Boolean(formik.errors.ApartmentId)}
              >
                {formik.errors.ApartmentId}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.account}
                onChange={(event) => {
                  formik.setFieldValue('account', !formik.values.account);
                }}
              />
            }
            label='Tạo tài khoản'
            labelPlacement='start'
          />
        </Grid>
        {/*<Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id='building-select-label'>Căn hộ</InputLabel>
              <Select
                labelId='building-select-label'
                id='building-select'
                label='Căn hộ'
                value={formik.values.apartment}
                onChange={formik.handleChange('apartment')}
                error={formik.touched.apartment && Boolean(formik.errors.apartment)}
              >
                {buildings.length !== 0 &&
                  buildings
                    .find((building) => building.id === formik.values.building)
                    .Apartments.map((apartment) => {
                      return (
                        <MenuItem key={apartment.id} value={apartment.id}>
                          {apartment.name}
                        </MenuItem>
                      );
                    })}
              </Select>
            </FormControl>
                  </Grid>*/}

        <Grid item xs={0}>
          <Button variant='contained' color='primary' type='submit'>
            Thêm cư dân
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
          Thêm cư dân thành công
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ResidentAddForm;
