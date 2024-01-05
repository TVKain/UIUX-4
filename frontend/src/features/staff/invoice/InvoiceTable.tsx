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
import { useLocalStorage } from '@uidotdev/usehooks';
import { User } from '../../../api/user/types';

import {
  GetInvoiceApartmentsResponse,
  getInvoiceApartments,
} from '../../../api/invoice-apartment/getInvoiceApartments';
import { InvoiceApartmentFull } from '../../../api/invoice-apartment/types';

import { formatCurrency } from '../../../util/currencyFormatter';

import { useTheme } from '@mui/material';

const InvoicePeriodMap = {
  monthly: 'Hàng tháng',
  quarterly: 'Hàng quý',
  yearly: 'Hàng năm',
};

export default function InvoiceTable() {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState<GetInvoiceApartmentsResponse>([]);
  const theme = useTheme();

  const columns: GridColDef<InvoiceApartmentFull>[] = [
    { field: 'id', headerName: 'ID', flex: 0.05 },
    {
      field: 'Invoice',
      headerName: 'Khoản thu',
      flex: 0.05,
      valueGetter: (params) => {
        return params.row.Invoice.name;
      },
    },

    {
      field: 'building',
      headerName: 'Chung cư',
      flex: 0.05,
      valueGetter: (params) => {
        return params.row.Apartment.Building.name;
      },
    },
    {
      field: 'apartment',
      headerName: 'Căn hộ',
      flex: 0.05,
      valueGetter: (params) => {
        return params.row.Apartment.name;
      },
    },
    {
      field: 'period',
      headerName: 'Kỳ hạn',
      flex: 0.05,
      valueFormatter(params) {
        // @ts-ignore
        return InvoicePeriodMap[params.value];
      },
    },
    {
      field: 'amount',
      headerName: 'Số tiền',
      flex: 0.05,
      valueFormatter(params) {
        // @ts-ignore
        return formatCurrency(params.value, 'vi-VN', 'VND');
      },
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      let invoices = await getInvoiceApartments();

      setInvoices(invoices);
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
