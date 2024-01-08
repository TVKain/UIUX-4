import { DataGrid, GridToolbar, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';

import { useState, useEffect } from 'react';

import {
  getUserInfos,
  GetUserInfoResponse,
  GetUserInfoResponseElement,
} from '../../../api/user-info/getUserInfos';

import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { dataGridLocaleText } from '../../../config/constants';

export default function ResidentTable() {
  const navigate = useNavigate();

  const columns: GridColDef<GetUserInfoResponseElement>[] = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'lastName', headerName: 'Họ', flex: 0.1 },
    { field: 'firstName', headerName: 'Tên', flex: 0.1 },
    {
      field: 'building',
      headerName: 'Chung cư',
      flex: 0.1,
      valueGetter: (params) => (params.row.Apartment ? params.row.Apartment.Building.name : ''),
    },
    {
      field: 'apartment',
      headerName: 'Căn hộ',
      flex: 0.1,
      valueGetter: (params) => (params.row.Apartment ? params.row.Apartment.name : ''),
    },
    { field: 'gender', headerName: 'Giới tính', flex: 0.1 },
    {
      field: 'birthday',
      headerName: 'Ngày sinh',
      flex: 0.1,
      type: 'date',
      valueGetter: (params) => new Date(params.row.birthday),
      valueFormatter(params) {
        return params.value?.toLocaleDateString('vi-VN');
      },
    },
    { field: 'city', headerName: 'Thành phố', flex: 0.1 },
    { field: 'district', headerName: 'Quận', flex: 0.1 },
    { field: 'subdistrict', headerName: 'Phường', flex: 0.1 },
    { field: 'phone', headerName: 'Số điện thoại', flex: 0.1 },
    { field: 'email', headerName: 'Email', flex: 0.1 },
    {
      field: 'Thao tác',
      type: 'actions',
      cellClassName: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          key='edit'
          icon={<Edit />}
          label='Edit'
          onClick={() => {
            navigate(`/staff/resident/update`, { state: params.row });
          }}
        />,
      ],
    },
  ];

  const [userInfos, setUserInfos] = useState<GetUserInfoResponse>([]);

  useEffect(() => {
    const fetchUserInfos = async () => {
      const response = await getUserInfos();

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
