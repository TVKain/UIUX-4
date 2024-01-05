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

import {
  getInvoiceApartmentPayments,
  GetInvoiceApartmentPaymentsResponse,
} from '../../../api/invoice-apartment-payment/getInvoiceApartmentPayments';
import { InvoiceApartmentPayment } from '../../../api/invoice-apartment-payment/types';

import { formatCurrency } from '../../../util/currencyFormatter';
import { getUserInfos } from '../../../api/user-info/getUserInfos';

const InvoicePeriodMap = {
  monthly: 'Hàng tháng',
  quarterly: 'Hàng quý',
  yearly: 'Hàng năm',
};

export default function InvoiceTable() {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage<User>('user', undefined);

  const theme = useTheme();

  const columns: GridColDef<InvoiceApartmentPayment>[] = [
    { field: 'id', headerName: 'ID', flex: 0.05 },
    {
      field: 'invoice',
      headerName: 'Khoản thu',
      flex: 0.15,
      valueGetter: (params: GridValueGetterParams<InvoiceApartmentPayment>) => {
        return params.row.InvoiceApartment.Invoice.name;
      },
    },
    {
      field: 'period',
      headerName: 'Kỳ hạn',
      flex: 0.15,
      valueGetter: (params: GridValueGetterParams<InvoiceApartmentPayment>) => {
        // @ts-ignore
        return InvoicePeriodMap[params.row.InvoiceApartment.period];
      },
    },
    {
      field: 'noticeDate',
      headerName: 'Ngày thông báo',
      type: 'dateTime',
      flex: 0.15,
      valueGetter: (params) => new Date(params.row.noticeDate),
      valueFormatter(params) {
        return params.value?.toLocaleDateString('vi-VN');
      },
    },
    {
      field: 'amount',
      headerName: 'Số tiền',
      flex: 0.15,
      valueFormatter(params) {
        return formatCurrency(params.value, 'vi-VN', 'VND');
      },
    },

    {
      field: 'paidDate',
      headerName: 'Ngày đóng',
      type: 'dateTime',
      flex: 0.15,
      valueGetter: (params) => (params.row.paidDate ? new Date(params.row.paidDate) : null),
      valueFormatter(params) {
        if (!params.value) return '';
        return params.value?.toLocaleDateString('vi-VN');
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 0.15,
      type: 'singleSelect',
      valueOptions: ['Đã đóng', 'Chưa đóng'],
      valueGetter: (params) => (params.row.paidDate ? 'Đã đóng' : 'Chưa đóng'),
      cellClassName: (params) => (params.value === 'Đã đóng' ? 'paid' : 'unpaid'),
    },
  ];

  const [invoices, setInvoices] = useState<GetInvoiceApartmentPaymentsResponse>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      let response = await getInvoiceApartmentPayments();

      let userInfos = await getUserInfos();

      let userInfo = userInfos.find((userInfo) => {
        return userInfo.UserId === user.id;
      });

      console.log(userInfo);

      response = response.filter((invoice) => {
        return invoice.InvoiceApartment.ApartmentId === userInfo?.ApartmentId;
      });

      response = response.sort((a, b) => {
        return dayjs(a.noticeDate).isAfter(dayjs(b.noticeDate)) ? -1 : 1;
      });
      setInvoices(response);
    };

    fetchRequests();
  }, []);

  return (
    <>
      <DataGrid
        sx={{
          '& .paid': { color: theme.palette.success.main },
          '& .unpaid': { color: theme.palette.error.main },
          '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold !important',
            fontSize: '1.1rem !important',
          },
        }}
        autoPageSize
        rows={invoices}
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
    </>
  );
}
