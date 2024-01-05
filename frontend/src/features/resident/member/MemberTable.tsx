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
import { useLocalStorage } from '@uidotdev/usehooks';
import { User } from '../../../api/user/types';
import { getApartments } from '../../../api/apartment/getApartments';
import { UserInfo } from '../../../api/user-info/types';

export default function MemberTable() {
  const navigate = useNavigate();

  const [user, _setUser] = useLocalStorage<User>('user', undefined);

  const columns: GridColDef<UserInfo>[] = [
    { field: 'id', headerName: 'ID', flex: 0.1 },
    { field: 'lastName', headerName: 'Họ', flex: 0.1 },
    { field: 'firstName', headerName: 'Tên', flex: 0.1 },

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
    { field: 'address', headerName: 'Địa chỉ', flex: 0.1 },
    { field: 'phone', headerName: 'Số điện thoại', flex: 0.1 },
    { field: 'email', headerName: 'Email', flex: 0.1 },
  ];

  const [userInfos, setUserInfos] = useState<UserInfo[]>([]);

  useEffect(() => {
    const fetchUserInfos = async () => {
      const userInfos = await getUserInfos();

      const apartments = await getApartments();
      const userInfo = userInfos.find((userInfo) => userInfo.UserId === user.id);
      const apartment = apartments.find((apartment) => apartment.id === userInfo!.ApartmentId);

      console.log(apartment?.UserInfos);

      setUserInfos(apartment!.UserInfos);
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
