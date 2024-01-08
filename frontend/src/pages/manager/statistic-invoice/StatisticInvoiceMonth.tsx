import { forwardRef, useEffect, useState } from 'react';

import {
  getInvoiceApartmentPayments,
  GetInvoiceApartmentPaymentsResponse,
} from '../../../api/invoice-apartment-payment/getInvoiceApartmentPayments';

import {
  parseInvoiceApartmentPaymentsToChartMonth,
  parseInvoiceApartmentPaymentsToChartYear,
  InvoiceChartYear,
  InvoiceChartMonth,
} from './util/statistic-parser';
import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  Grow,
  Hidden,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { formatCurrency } from '../../../util/currencyFormatter';
import { useNavigate } from 'react-router-dom';
import { Invoice } from '../../../api/invoice/types';

interface SelectedChartData {
  year: number;
  month: number;
  invoiceType: string;
}

interface SelectedChartViewData extends Array<{ name: string; total: number }> {}

function invoiceChartMonthToselectedChartViewData(
  invoiceChartMonth: InvoiceChartMonth[],
  selectedChartData: SelectedChartData,
): SelectedChartViewData {
  const selectedChartViewData: SelectedChartViewData = [];

  const selectedYear = invoiceChartMonth.find((year) => year.year === selectedChartData.year);
  if (!selectedYear) {
    return selectedChartViewData;
  }

  const selectedMonth = selectedYear.months.find(
    (month) => month.month === selectedChartData.month,
  );
  if (!selectedMonth) {
    return selectedChartViewData;
  }

  const selectedInvoiceType = selectedMonth.invoiceType.find(
    (invoiceType) => invoiceType.type === selectedChartData.invoiceType,
  );

  if (!selectedInvoiceType) {
    return selectedChartViewData;
  }

  selectedChartViewData.push({
    name: selectedInvoiceType.type,
    total: selectedInvoiceType.total,
  });

  selectedChartViewData.push({
    name: 'Còn lại',
    total: selectedMonth.total - selectedInvoiceType.total,
  });

  return selectedChartViewData;
}

function StatisticInvoiceChart({ invoiceChartMonth }: { invoiceChartMonth: InvoiceChartMonth[] }) {
  const [selectedChartData, setSelectedChartData] = useState<SelectedChartData>({
    year: invoiceChartMonth[0].year,
    month: invoiceChartMonth[0].months[0].month,
    invoiceType: invoiceChartMonth[0].months[0].invoiceType[0].type,
  });

  const theme = useTheme();

  const invoiceTypes = invoiceChartMonth[0].months[0].invoiceType.map((invoiceType) => {
    return invoiceType.type;
  });

  const [inputInvoiceType, setInputInvoiceType] = useState<string>('');

  // Chỉnh màu ở đây
  const chartColors = [theme.palette.primary.main, theme.palette.secondary.main];

  return (
    <Box
      display='flex'
      gap={4}
      sx={{
        width: '100%',
        height: '100%',
      }}
      flexDirection='column'
    >
      <FormControl fullWidth>
        <InputLabel id='chart-year'>Năm</InputLabel>
        <Select
          id='chart-year'
          labelId='chart-year'
          value={selectedChartData.year}
          label='Năm'
          onChange={(event) => {
            setSelectedChartData({
              ...selectedChartData,
              year: event.target.value as number,
            });
          }}
          fullWidth
        >
          {invoiceChartMonth.map((year) => {
            return (
              <MenuItem key={year.year} value={year.year}>
                {year.year}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='chart-year'>Tháng</InputLabel>
        <Select
          id='chart-month'
          labelId='chart-month'
          value={selectedChartData.month}
          label='Tháng'
          onChange={(event) => {
            setSelectedChartData({
              ...selectedChartData,
              month: event.target.value as number,
            });
          }}
          fullWidth
        >
          {invoiceChartMonth[0].months.map((month) => {
            return (
              <MenuItem key={month.month} value={month.month}>
                Tháng {month.month + 1}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <Autocomplete
          disableClearable={true}
          id='invoice-type'
          options={invoiceTypes}
          value={selectedChartData.invoiceType}
          onChange={(event, newValue: string | null) => {
            setSelectedChartData({
              ...selectedChartData,
              invoiceType: newValue as string,
            });
          }}
          inputValue={inputInvoiceType}
          onInputChange={(event, newInputValue) => {
            setInputInvoiceType(newInputValue);
          }}
          fullWidth
          renderInput={(params) => <TextField {...params} label='Khoản thu' />}
          PaperComponent={PaperComponentForward}
        />
      </FormControl>

      <Paper
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              animationDuration={300}
              id='chart-year'
              data={invoiceChartMonthToselectedChartViewData(invoiceChartMonth, selectedChartData)}
              dataKey='total'
              fill='#82ca9d'
              label={({ name, total }) => `${formatCurrency(total, 'vn', 'VND')}`}
              legendType='circle'
            >
              {invoiceChartMonthToselectedChartViewData(invoiceChartMonth, selectedChartData).map(
                (entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index]} />
                ),
              )}
            </Pie>
            <Tooltip
              formatter={(value, name): any => {
                return formatCurrency(Number(value.valueOf()), 'vn', 'VND');
              }}
              wrapperStyle={{ zIndex: 1000 }}
            />
            <Legend
              verticalAlign='top'
              wrapperStyle={{
                fontSize: '1.2rem',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default function StatisticInvoiceMonth() {
  const [invoiceChartMonth, setInvoiceChartMonth] = useState<InvoiceChartMonth[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInvoiceApartmentPayments() {
      const res = await getInvoiceApartmentPayments();

      const chartData = await parseInvoiceApartmentPaymentsToChartMonth(res);
      setInvoiceChartMonth(chartData);

      console.log(chartData);
    }

    fetchInvoiceApartmentPayments();
  }, []);

  if (invoiceChartMonth.length === 0) {
    return null;
  }

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Thống kê khoản thu
      </Typography>

      <Divider />

      <FormControl fullWidth>
        <InputLabel id='stats-by'>Thống kê theo</InputLabel>
        <Select
          labelId='stats-by'
          id='demo-simple-select'
          value={'month'}
          label='Thống kê theo'
          onChange={(event) => {
            if (event.target.value === 'year') {
              navigate('/manager/statistic/invoice/year');
            }
          }}
        >
          <MenuItem value={'month'}>Tháng</MenuItem>
          <MenuItem value={'year'}>Năm</MenuItem>
        </Select>
      </FormControl>

      <Box
        flex={1}
        display='flex'
        sx={{
          width: '100%',
        }}
        gap={4}
      >
        <StatisticInvoiceChart invoiceChartMonth={invoiceChartMonth} />
        <Divider orientation='vertical' flexItem />
        <StatisticInvoiceChart invoiceChartMonth={invoiceChartMonth} />
      </Box>
    </Box>
  );
}

// @ts-ignore
function PaperComponent(paperProps, ref) {
  return (
    <Grow in onExited={paperProps.onExited}>
      <Paper {...paperProps} ref={ref} />
    </Grow>
  );
}
const PaperComponentForward = forwardRef(PaperComponent);
