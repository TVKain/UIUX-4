import { forwardRef, useEffect, useState } from 'react';

import {
  getInvoiceApartmentPayments,
  GetInvoiceApartmentPaymentsResponse,
} from '../../../api/invoice-apartment-payment/getInvoiceApartmentPayments';

import {
  parseInvoiceApartmentPaymentsToChartMonth,
  parseInvoiceApartmentPaymentsToChartYear,
  InvoiceChartYear,
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

interface SelectedChartData {
  year: number;
  invoiceType: string;
}

interface SelectedChartViewData extends Array<{ name: string; total: number }> {}

function invoiceChartYearToselectedChartViewData(
  invoiceChartYear: InvoiceChartYear[],
  selectedChartData: SelectedChartData,
): SelectedChartViewData {
  const selectedChartViewData: SelectedChartViewData = [];

  const selectedYear = invoiceChartYear.find((year) => year.year === selectedChartData.year);
  if (!selectedYear) {
    return selectedChartViewData;
  }

  const selectedInvoiceType = selectedYear.invoiceType.find(
    (invoiceType) => invoiceType.name === selectedChartData.invoiceType,
  );

  if (!selectedInvoiceType) {
    return selectedChartViewData;
  }

  selectedChartViewData.push({
    name: selectedInvoiceType.name,
    total: selectedInvoiceType.total,
  });

  selectedChartViewData.push({
    name: 'Còn lại',
    total: selectedYear.total - selectedInvoiceType.total,
  });

  return selectedChartViewData;
}

function StatisticInvoiceChart({ invoiceChartYear }: { invoiceChartYear: InvoiceChartYear[] }) {
  const theme = useTheme();

  const invoiceTypes = invoiceChartYear[0].invoiceType.map((invoiceType) => {
    return invoiceType.name;
  });

  const [inputInvoiceType, setInputInvoiceType] = useState<string>('');

  const [selectedChartData, setSelectedChartData] = useState<SelectedChartData>({
    year: invoiceChartYear[0].year,
    invoiceType: invoiceTypes[0],
  });

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
          {invoiceChartYear.map((year) => {
            return (
              <MenuItem key={year.year} value={year.year}>
                {year.year}
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
              data={invoiceChartYearToselectedChartViewData(invoiceChartYear, selectedChartData)}
              dataKey='total'
              label={({ name, total }) => `${formatCurrency(total, 'vn', 'VND')}`}
              legendType='circle'
            >
              {invoiceChartYearToselectedChartViewData(invoiceChartYear, selectedChartData).map(
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

export default function StatisticInvoiceYear() {
  const [invoiceChartYear, setInvoiceChartYear] = useState<InvoiceChartYear[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInvoiceApartmentPayments() {
      const res = await getInvoiceApartmentPayments();

      const chartData = await parseInvoiceApartmentPaymentsToChartYear(res);
      setInvoiceChartYear(chartData);

      console.log(chartData);
    }

    fetchInvoiceApartmentPayments();
  }, []);

  if (invoiceChartYear.length === 0) {
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
          value={'year'}
          label='Thống kê theo'
          onChange={(event) => {
            if (event.target.value === 'month') {
              navigate('/manager/statistic/invoice/month');
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
        <StatisticInvoiceChart invoiceChartYear={invoiceChartYear} />
        <Divider orientation='vertical' flexItem />
        <StatisticInvoiceChart invoiceChartYear={invoiceChartYear} />
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
