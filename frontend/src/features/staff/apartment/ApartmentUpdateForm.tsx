import { Button, TextField, Grid, Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import { useEffect, useState } from 'react';

import { Snackbar, Alert } from '@mui/material';

import axios from 'axios';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation } from 'react-router-dom';
import { GetBuildingsResponse, getBuildings } from '../../../api/building/getBuildings';
import { UpdateApartmentRequest, updateApartment } from '../../../api/apartment/updateApartment';

const ApartmentUpdateForm = () => {
  const location = useLocation();

  const formik = useFormik<UpdateApartmentRequest>({
    initialValues: {
      id: location.state.id,
      name: location.state.name,
      size: location.state.size,
      BuildingId: location.state.BuildingId,
    },
    validationSchema: yup.object({
      name: yup.string().required('Tên căn hộ không được để trống'),
      size: yup
        .number()
        .required('Kích cỡ căn hộ không được để trống')
        .min(1, 'Kích cỡ căn hộ phải lớn hơn 0'),
      BuildingId: yup.string().required('Chung cư không được để trống'),
    }),

    onSubmit: async (values) => {
      try {
        await updateApartment(values);

        setSnackbarOpen(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [buildings, setBuildings] = useState<GetBuildingsResponse>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await getBuildings();
      setBuildings(response);
    };

    fetchBuildings();
  }, []);

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
          Cập nhật căn hộ thành công
        </Alert>
      </Snackbar>
      <Grid container spacing={4} justifyContent='flex-end'>
        <Grid item xs={6}>
          <TextField
            label='Tên căn hộ'
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Kích cỡ căn hộ'
            fullWidth
            type='number'
            error={formik.touched.size && Boolean(formik.errors.size)}
            helperText={formik.touched.size && formik.errors.size}
            name='size'
            value={formik.values.size}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='building-select-label'>Chung cư</InputLabel>
            <Select
              labelId='building-select-label'
              id='building-select'
              label='Chung cư'
              value={formik.values.BuildingId}
              onChange={(event) => {
                formik.setFieldValue('BuildingId', event.target.value);
              }}
              error={formik.touched.BuildingId && Boolean(formik.errors.BuildingId)}
            >
              {buildings.map((building) => {
                return (
                  <MenuItem key={building.id} value={building.id}>
                    {building.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={0}>
          <Button variant='contained' color='primary' type='submit'>
            Cập nhật căn hộ
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ApartmentUpdateForm;
