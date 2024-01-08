import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../../../api/user-info/types';
import { getUserInfos } from '../../../api/user-info/getUserInfos';

import { GetUserInfoResponse } from '../../../api/user-info/getUserInfos';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  LineChart,
  Tooltip,
  BarChart,
  Bar,
  ComposedChart,
} from 'recharts';

import ChartType from './type/chartType';

import { useTheme } from '@mui/material/styles';

import { ChartYear, parseUserInfoToChartYear } from './util/resident-parser';
import theme from '../../../theme/theme';

function getChartData(fullChartData: ChartYear[], startYear: number, numYear: number) {
  const chartData = fullChartData.filter((chartYear) => {
    return chartYear.year >= startYear && chartYear.year < startYear + numYear;
  });
  return chartData;
}

export default function StatisticResidentYear() {
  const navigate = useNavigate();

  const [fullChartData, setFullChartData] = useState<ChartYear[]>([]);
  const [chartData, setChartData] = useState<ChartYear[]>([]);
  const [chartType, setChartType] = useState<ChartType>(ChartType.LineChart);
  const [startYear, setStartYear] = useState<number>();
  const numYear = 10;

  const chartColor = {
    join: '#557C55',
    leave: '#FF004D',
    total: theme.palette.info.light,
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getUserInfos();
      const chartYear = parseUserInfoToChartYear(res);

      const currentYear = new Date().getFullYear();
      const startYear = currentYear - numYear + 1;
      setStartYear(startYear);
      setFullChartData(chartYear);

      setChartData(getChartData(chartYear, startYear, numYear));
    }

    fetchData();
  }, []);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Thống kê cư dân
      </Typography>

      <Divider />

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id='stats-by'>Thống kê theo</InputLabel>
            <Select
              labelId='stats-by'
              id='stats-by'
              value={'year'}
              label='Thống kê theo'
              onChange={(event) => {
                if (event.target.value === 'month') {
                  navigate('/manager/statistic/resident/month');
                }
              }}
            >
              <MenuItem value={'month'}>Tháng</MenuItem>
              <MenuItem value={'year'}>Năm</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id='start-year'>Năm bắt đầu</InputLabel>
            <Select
              labelId='start-year'
              id='demo-simple-select'
              value={startYear}
              label='Năm bắt đầu'
              onChange={(event) => {
                setStartYear(event.target.value as number);
                setChartData(getChartData(fullChartData, event.target.value as number, numYear));
              }}
            >
              {fullChartData.map((data) => (
                <MenuItem value={data.year} key={data.year}>
                  {data.year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='chart-type'>Loại biểu đồ</InputLabel>
            <Select
              labelId='chart-type'
              id='demo-simple-select'
              value={chartType}
              label='Thống kê theo'
              onChange={(event) => {
                setChartType(event.target.value as ChartType);
              }}
            >
              <MenuItem value={ChartType.LineChart}>Đường</MenuItem>
              <MenuItem value={ChartType.BarChart}>Cột</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Divider />

      {chartType === ChartType.LineChart && (
        <Box flex={1} display='flex' flexDirection='column' gap={4}>
          <Paper
            elevation={2}
            sx={{
              height: '100%',
              width: '100%',
              padding: 2,
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={chartData}
                syncId='yearResident'
                margin={{
                  top: 5,
                  right: 64,

                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='year'
                  name='Năm'
                  tickFormatter={(value) => `Năm ${value}`}
                  dy={10}
                />
                <YAxis name='Số cư dân' />
                <Tooltip
                  labelFormatter={(label) => {
                    return `Năm ${label}`;
                  }}
                />

                <Legend
                  verticalAlign='top'
                  height={36}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                />
                <Line
                  type='monotone'
                  name='Số lượng cư dân vào'
                  dataKey='joinValue'
                  stroke={chartColor.join}
                  strokeWidth={4}
                />
                <Line
                  type='monotone'
                  name='Số lượng cư dân ra'
                  dataKey='leaveValue'
                  stroke={chartColor.leave}
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              height: '100%',
              width: '100%',
              padding: 2,
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                syncId='yearResident'
                data={chartData}
                margin={{
                  top: 5,
                  right: 64,

                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <Legend
                  verticalAlign='top'
                  height={36}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                />
                <XAxis
                  dataKey='year'
                  name='Năm'
                  tickFormatter={(value) => `Năm ${value}`}
                  dy={10}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) => {
                    return `Năm ${label}`;
                  }}
                />
                <Line
                  dataKey='total'
                  stroke={chartColor.total}
                  strokeWidth={4}
                  name='Tổng số cư dân'
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      )}
      {chartType === ChartType.BarChart && (
        <Box flex={1} display='flex' flexDirection='column' gap={4}>
          <Paper
            elevation={2}
            sx={{
              height: '100%',
              width: '100%',
              padding: 2,
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={chartData}
                syncId='yearResident'
                margin={{
                  top: 5,
                  right: 64,

                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='year'
                  name='Năm'
                  tickFormatter={(value) => `Năm ${value}`}
                  dy={10}
                />
                <YAxis name='Số cư dân' />
                <Tooltip
                  labelFormatter={(label) => {
                    return `Năm ${label}`;
                  }}
                />

                <Legend
                  verticalAlign='top'
                  height={36}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                />
                <Bar name='Số lượng cư dân vào' dataKey='joinValue' fill={chartColor.join} />
                <Bar name='Số lượng cư dân ra' dataKey='leaveValue' fill={chartColor.leave} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              height: '100%',
              width: '100%',
              padding: 2,
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                syncId='yearResident'
                data={chartData}
                margin={{
                  top: 5,
                  right: 64,

                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <Legend
                  verticalAlign='top'
                  height={36}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                />
                <XAxis
                  dataKey='year'
                  name='Năm'
                  tickFormatter={(value) => `Năm ${value}`}
                  dy={10}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) => {
                    return `Năm ${label}`;
                  }}
                />
                <Bar dataKey='total' name='Tổng số cư dân' fill={chartColor.total} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
