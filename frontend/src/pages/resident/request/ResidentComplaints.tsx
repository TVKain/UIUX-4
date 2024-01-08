// @ts-nocheck

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { useState } from 'react';
import dayjs from 'dayjs';

enum Statuses {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  REJECTED = 'REJECTED',
}

const STATUS_COLORS = {
  IN_PROGRESS: '#F9A825',
  DONE: '#4CAF50',
  REJECTED: '#F44336',
};

const STATUSES = {
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  REJECTED: 'REJECTED',
};

const rows = [
  {
    id: 1,
    complaintNature: 'Ngo Thi Lam',
    complaintTitle: 'Owner',
    date: dayjs(),
    status: STATUSES.REJECTED,
  },
];

const getStatusInfo = (status: Statuses) => {
  let color = STATUS_COLORS.REJECTED;
  let text = 'Bị từ chối';

  switch (status) {
    case STATUSES.IN_PROGRESS:
      color = STATUS_COLORS.IN_PROGRESS;
      text = 'Đang xử lý';
      break;
    case STATUSES.DONE:
      color = STATUS_COLORS.DONE;
      text = 'Hoàn thành';
      break;
    default:
      break;
  }

  return {
    color,
    text,
  };
};

const covertDate = (value: any) => dayjs(value).format('DD/MM/YYYY');

const ResidentComplaints = () => {
  const [dataModal, setDataModal] = useState(null);
  const [filter, setFilter] = useState('');

  const columns = [
    { field: 'complaintNature', headerName: 'Bản chất khiếu nại', flex: 1 },
    {
      field: 'complaintTitle',
      headerName: 'Tiêu đề khiếu nại',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Ngày',
      flex: 1,
      renderCell: (params) => {
        return <Typography variant='span'>{covertDate(params.value)}</Typography>;
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: (params) => {
        const statusInfo = getStatusInfo(params.value);

        return (
          <Typography variant='span' color={statusInfo.color}>
            {statusInfo.text}
          </Typography>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Tùy chỉnh',
      flex: 1,
      renderCell: ({ row }) => (
        <MoreVertSharpIcon
          onClick={() => {
            setDataModal({
              complaintNature: row.complaintNature,
              complaintTitle: row.complaintTitle,
              date: row.date,
              status: row.status,
              desc: 'Chưa có gì',
              solution: 'Chưa có gì',
            });
          }}
          sx={{ cursor: 'pointer' }}
        />
      ),
    },
  ];

  const handleSetFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Box>
        <Typography
          variant='h1'
          fontSize={40}
          fontWeight={600}
          borderBottom={1}
          p={3}
          borderColor='rgba(0, 0, 0, 0.12)'
        >
          User Management
        </Typography>

        <Box px={3} mt={4} display='flex' alignItems='center' justifyContent='flex-end' gap={4}>
          <FormControl>
            <InputLabel id='filter-label'>Bộ lọc</InputLabel>
            <Select
              sx={{ width: 135 }}
              labelId='filter-label'
              id='filter'
              value={filter}
              label='Bộ lọc'
              onChange={handleSetFilter}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <TextField
            sx={{ width: 345 }}
            id='outlined-basic'
            label='Tìm kiếm'
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box mt={2} px={3}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

      <Modal
        open={!!dataModal}
        onClose={() => setDataModal(null)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography fontWeight={600} variant='h3' fontSize={20}>
            Khiếu nại
          </Typography>

          <Stack spacing={3} mt={4}>
            <Stack direction='row' spacing={4} sx={{ '& > :not(style)': { flex: 1 } }}>
              <TextField
                label='Bản chất khiếu nại'
                defaultValue={dataModal?.complaintNature}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label='Tiêu đề khiếu nại'
                defaultValue={dataModal?.complaintTitle}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <Stack direction='row' spacing={4} sx={{ '& > :not(style)': { flex: 1 } }}>
              <TextField
                label='Trạng thái'
                defaultValue={getStatusInfo(dataModal?.status).text}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label='Ngày nộp đơn'
                defaultValue={covertDate(dataModal?.date)}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <TextField
              label='Mô tả'
              defaultValue={dataModal?.desc}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label='Giải pháp'
              defaultValue={dataModal?.solution}
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ResidentComplaints;
