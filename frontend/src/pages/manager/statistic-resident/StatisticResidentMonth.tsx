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
} from 'recharts';

import { useTheme } from '@mui/material/styles';

import { ChartMonth, parseUserInfoToChartMonth, ChartMonthElement } from './util/resident-parser';

import ChartType from './type/chartType';

export default function StatisticResidentMonth() {
  const navigate = useNavigate();

  const theme = useTheme();
  const [chartType, setChartType] = useState<ChartType>(ChartType.LineChart);

  const chartColor = {
    join: '#557C55',
    leave: '#FF004D',
    total: theme.palette.info.light,
  };

  const [chartData, setChartData] = useState<ChartMonth[]>([]);

  const [selectedData, setSelectedData] = useState<ChartMonth>();
  useEffect(() => {
    async function fetchData() {
      const res = await getUserInfos();
      const data = parseUserInfoToChartMonth(res);

      setChartData(data);
      setSelectedData(data[0]);
    }

    fetchData();
  }, []);

  if (!selectedData) {
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
              id='demo-simple-select'
              value={'month'}
              label='Thống kê theo'
              onChange={(event) => {
                if (event.target.value === 'year') {
                  navigate('/manager/statistic/resident/year');
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
            <InputLabel id='year'>Năm</InputLabel>
            <Select
              labelId='year'
              id='yeart'
              label='Năm'
              value={selectedData?.year}
              onChange={(event) => {
                let data = chartData.find((data) => data.year === event.target.value);
                setSelectedData(data);
              }}
            >
              {chartData.map((data) => (
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
            sx={{
              height: '100%',
              width: '100%',
              padding: 2,
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                syncId='residentMonth'
                data={selectedData?.months}
                margin={{
                  top: 5,
                  right: 64,

                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='month'
                  tickFormatter={(value) => `Tháng ${parseInt(value) + 1}`}
                  dy={10}
                />
                <YAxis allowDecimals={false} />
                <Tooltip
                  labelFormatter={(label) => {
                    return `Tháng ${parseInt(label) + 1} năm ${selectedData?.year}`;
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
            sx={{
              height: '100%',
              width: '100%',
              padding: 2,
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                syncId='residentMonth'
                data={selectedData?.months}
                margin={{
                  top: 5,
                  right: 64,

                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='month'
                  tickFormatter={(value) => `Tháng ${parseInt(value) + 1}`}
                  dy={10}
                />
                <YAxis allowDecimals={false} />
                <Tooltip
                  labelFormatter={(label) => {
                    return `Tháng ${parseInt(label) + 1} năm ${selectedData?.year}`;
                  }}
                />
                <Legend
                  verticalAlign='top'
                  height={36}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                />
                <Line
                  type='monotone'
                  name='Tổng cư dân'
                  dataKey='total'
                  stroke={chartColor.total}
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      )}
      {chartType === ChartType.BarChart && (
        <Box flex={1} display='flex' flexDirection='column' gap={4}>
          <Paper
            sx={{
              height: '100%',
              width: '100%',
              padding: 2,
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                syncId='residentMonth'
                data={selectedData?.months}
                margin={{
                  top: 5,
                  right: 64,

                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='month'
                  tickFormatter={(value) => `Tháng ${parseInt(value) + 1}`}
                  dy={10}
                />
                <YAxis allowDecimals={false} />
                <Tooltip
                  labelFormatter={(label) => {
                    return `Tháng ${parseInt(label) + 1} năm ${selectedData?.year}`;
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
            sx={{
              height: '100%',
              width: '100%',
              padding: 2,
            }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                syncId='residentMonth'
                data={selectedData?.months}
                margin={{
                  top: 5,
                  right: 64,

                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='month'
                  tickFormatter={(value) => `Tháng ${parseInt(value) + 1}`}
                  dy={10}
                />
                <YAxis allowDecimals={false} />
                <Tooltip
                  labelFormatter={(label) => {
                    return `Tháng ${parseInt(label) + 1} năm ${selectedData?.year}`;
                  }}
                />
                <Legend
                  verticalAlign='top'
                  height={36}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                />
                <Bar name='Tổng cư dân' dataKey='total' fill={chartColor.total} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
