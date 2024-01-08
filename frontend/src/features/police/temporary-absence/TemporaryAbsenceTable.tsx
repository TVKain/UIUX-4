import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import {
  getAllTemporaryResidences,
  TemporaryResidenceFull,
} from '../../../api/temporary-residence/getAllTemporaryResidences';
import { dataGridLocaleText } from '../../../config/constants';
import { useEffect, useState } from 'react';
import { TemporaryAbsenceFull } from '../../../api/temporary-absence/types';
import { getAllTemporaryAbsences } from '../../../api/temporary-absence/getAllTemporaryResidences';

const columns: GridColDef<TemporaryAbsenceFull>[] = [
  { field: 'id', headerName: 'ID', flex: 0.1 },
  { field: 'UserInfoId', headerName: 'ID người dùng', flex: 0.1 },
  {
    field: 'lastName',
    headerName: 'Họ',
    flex: 0.1,
    valueGetter: (params) => params.row.UserInfo.lastName,
  },
  {
    field: 'firstName',
    headerName: 'Tên',
    flex: 0.1,
    valueGetter: (params) => params.row.UserInfo.firstName,
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    flex: 0.1,
    valueGetter: (params) => params.row.UserInfo.phone,
  },
  { field: 'permanentAddress', headerName: 'Địa chỉ thường trú', flex: 0.15 },
  { field: 'currentAddress', headerName: 'Địa chỉ hiện tại', flex: 0.15 },
  { field: 'destinationAddress', headerName: 'Địa chỉ đích', flex: 0.15 },
  {
    field: 'startDate',
    type: 'date',
    headerName: 'Ngày bắt đầu',
    flex: 0.15,
    valueGetter: (params) => new Date(params.row.startDate),
    valueFormatter(params) {
      return params.value?.toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'endDate',
    type: 'date',
    headerName: 'Ngày kết thúc',
    flex: 0.15,
    valueGetter: (params) => new Date(params.row.startDate),
    valueFormatter(params) {
      return params.value?.toLocaleDateString('vi-VN');
    },
  },
  {
    field: 'reason',
    headerName: 'Lý do',
    flex: 0.15,
  },
];

export default function TemporaryAbsenceTable() {
  const [userInfos, setUserInfos] = useState<TemporaryAbsenceFull[]>([]);

  useEffect(() => {
    const fetchUserInfos = async () => {
      const response = await getAllTemporaryAbsences();
      console.log(response);
      setUserInfos(response);
    };

    fetchUserInfos();
  }, []);

  return (
    <DataGrid
      sx={{
        '.MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold !important',
          fontSize: '1.1rem !important',
        },
      }}
      autoPageSize
      rows={userInfos}
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
  );
}
