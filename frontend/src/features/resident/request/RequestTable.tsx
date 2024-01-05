import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
  viVN,
  GridValueGetterParams,
} from '@mui/x-data-grid';

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  getRequestsByUserId,
  GetRequestsByUserIdResponse,
} from '../../../api/request/getRequestByUserId';
import { useLocalStorage } from '@uidotdev/usehooks';
import { User } from '../../../api/user/types';
import { RequestFull } from '../../../api/request/types';
import dayjs from 'dayjs';

import { dataGridLocaleText } from '../../../config/constants';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

const RequestStatusMap = {
  'Đang xử lý': 'processing',
  'Chấp nhận': 'accepted',
  'Từ chối': 'denied',
};

export default function RequestTable() {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage<User>('user', undefined);

  const theme = useTheme();

  const columns: GridColDef<RequestFull>[] = [
    { field: 'id', headerName: 'ID', flex: 0.05 },
    { field: 'title', headerName: 'Tiêu đề', flex: 0.15 },
    { field: 'description', headerName: 'Nội dung', flex: 0.15 },
    {
      field: 'createdAt',
      headerName: 'Thời gian tạo',
      flex: 0.125,
      type: 'dateTime',
      valueGetter: (params) => new Date(params.row.createdAt),
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 0.1,
      valueFormatter: (params) => params.value,
      cellClassName: (params) => RequestStatusMap[params.value as keyof typeof RequestStatusMap],
    },
    {
      field: 'processBy',
      headerName: 'Người xử lý',
      flex: 0.1,
      valueGetter: (params) => params.row.Staff?.username,
    },
    {
      field: 'response',
      headerName: 'Phản hồi',
      flex: 0.125,
    },
    {
      field: 'actions',
      type: 'actions',
      cellClassName: 'actions',
      flex: 0.125,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setCurrentRequest(params.row);
            setOpen(true);
          }}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const [requests, setRequests] = useState<GetRequestsByUserIdResponse>([]);
  const [open, setOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<RequestFull | undefined>();

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await getRequestsByUserId({
        UserId: user.id,
      });
      setRequests(response);
    };

    fetchRequests();
  }, []);

  return (
    <>
      <DataGrid
        sx={{
          '& .processing': { color: theme.palette.warning.main },
          '& .accepted': { color: theme.palette.success.main },
          '& .denied': { color: theme.palette.error.main },

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

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          '& .processing': { color: theme.palette.warning.main },
          '& .accepted': { color: theme.palette.success.main },
          '& .denied': { color: theme.palette.error.main },
        }}
      >
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
          <Box display='flex' flexDirection='column' gap={3}>
            {currentRequest?.StaffId && (
              <Grid container rowGap={1}>
                <Grid xs={12} item>
                  <Typography variant='h6'>Thông tin xử lý</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant='body1'>Phản hồi</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant='body1'>{currentRequest?.response}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='body1'>Người xử lý</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant='body1'>{currentRequest?.Staff?.username}</Typography>
                </Grid>
              </Grid>
            )}
            <Grid container rowGap={1}>
              <Grid xs={12} item>
                <Typography variant='h6'>Thông tin yêu cầu</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='body1'>Trạng thái</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant='body1'
                  className={
                    RequestStatusMap[currentRequest?.status! as keyof typeof RequestStatusMap]
                  }
                >
                  {currentRequest?.status}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography variant='body1'>Nội dung </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='body1'>{currentRequest?.description}</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography variant='body1'>Thời gian tạo</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='body1'>
                  {new Date(currentRequest?.createdAt!).toLocaleString('vi-VN')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
