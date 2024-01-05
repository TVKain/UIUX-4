import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
  viVN,
  GridValueGetterParams,
} from '@mui/x-data-grid';

import { CloseOutlined } from '@mui/icons-material';

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';

import {
  getRequestsByUserId,
  GetRequestsByUserIdResponse,
} from '../../../api/request/getRequestByUserId';

import { RequestFull } from '../../../api/request/types';

import { dataGridLocaleText } from '../../../config/constants';
import { getRequests } from '../../../api/request/getRequests';
import { CheckCircleOutlined, CancelOutlined } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Alert,
  Snackbar,
  Typography,
  Box,
  IconButton,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import updateRequest, { UpdateRequestRequest } from '../../../api/request/updateRequest';
import { useLocalStorage } from '@uidotdev/usehooks';
import { User } from '../../../api/user/types';

interface UpdateRequestFormProps {
  response: string;
  status: string;
}

export default function RequestTable() {
  const navigate = useNavigate();

  const [currentRequest, setCurrentRequest] = useState<RequestFull | undefined>();

  const [user, _setUser] = useLocalStorage<User>('user', undefined);

  const columns: GridColDef<RequestFull>[] = [
    { field: 'id', headerName: 'ID', flex: 0.05 },
    { field: 'title', headerName: 'Tiêu đề', flex: 0.3 },
    { field: 'description', headerName: 'Nội dung', flex: 0.3 },
    {
      field: 'by',
      headerName: 'Người yêu cầu',
      flex: 0.15,
      valueGetter: (params) =>
        `${params.row.User.UserInfo.lastName} ${params.row.User.UserInfo.firstName}`,
    },
    {
      field: 'createdAt',
      headerName: 'Thời gian tạo',
      flex: 0.2,
      type: 'dateTime',
      valueGetter: (params) => new Date(params.row.createdAt),
      valueFormatter: (params) => params.value?.toLocaleString('vi-VN'),
    },
    {
      field: 'handle',
      type: 'actions',
      flex: 0.1,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              handleClickOpen(params.row);
            }}
          >
            Xử lý
          </Button>
        );
      },
    },
  ];

  const [requests, setRequests] = useState<GetRequestsByUserIdResponse>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      let requests = await getRequests();

      requests = requests.filter((request) => {
        return request.status === 'Đang xử lý';
      });

      setRequests(requests);
    };

    fetchRequests();
  }, [snackbarOpen]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (currentRequest: RequestFull) => {
    formik.resetForm();
    setOpen(true);
    setCurrentRequest(currentRequest);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik<UpdateRequestFormProps>({
    initialValues: {
      response: '',
      status: '',
    },
    validationSchema: yup.object<UpdateRequestFormProps>({
      response: yup.string().required('Phản hồi không được để trống'),
      status: yup.string(),
    }),
    onSubmit: async (values) => {
      const updateRequestRequest: UpdateRequestRequest = {
        id: currentRequest!.id,
        response: values.response,
        status: values.status,
        StaffId: user!.id,
      };

      await updateRequest(updateRequestRequest);

      setOpen(false);
      setSnackbarOpen(true);
    },
  });

  return (
    <>
      <DataGrid
        sx={{
          '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold !important',
            fontSize: '1.1rem !important',
          },
        }}
        autoPageSize
        rows={requests}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pagination
        checkboxSelection
        disableRowSelectionOnClick
        localeText={dataGridLocaleText}
        slots={{ toolbar: GridToolbar }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle display='flex' justifyContent='center' alignItems='center'>
          {currentRequest?.title}
          <IconButton
            sx={{ ml: 'auto', mr: -1 }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant='body1'>Nội dung </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='body1'>{currentRequest?.description}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='body1'>Người yêu cầu </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='body1'>
                {`${currentRequest?.User.UserInfo.firstName} ${currentRequest?.User.UserInfo.lastName}`}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='body1'> Số điện thoại </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='body1'>{currentRequest?.User.UserInfo.phone}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='body1'>Chung cư</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='body1'>
                {currentRequest?.User.UserInfo.Apartment.Building.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='body1'>Căn hộ</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='body1'>
                {currentRequest?.User.UserInfo.Apartment.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='body1'>Thời gian tạo</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='body1'>
                {new Date(currentRequest?.createdAt!).toLocaleString('vi-VN')}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={formik.touched.response && Boolean(formik.errors.response)}
                helperText={formik.touched.response && formik.errors.response}
                autoFocus
                margin='dense'
                id='name'
                label='Phản hồi'
                fullWidth
                value={formik.values.response}
                onChange={formik.handleChange('response')}
                variant='standard'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ paddingBottom: 2 }}>
          <Button
            onClick={() => {
              formik.setFieldValue('status', 'Từ chối');
              formik.handleSubmit();
            }}
          >
            Từ chối
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              formik.setFieldValue('status', 'Chấp nhận');
              formik.handleSubmit();
            }}
          >
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>

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
          Xử lý yêu cầu thành công
        </Alert>
      </Snackbar>
    </>
  );
}
