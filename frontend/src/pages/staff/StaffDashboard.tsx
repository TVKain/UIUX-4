import {
  Box,
  Typography,
  Divider,
  Button,
  Grid,
  Paper,
  useTheme,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { User } from '../../api/user/types';
import { getUserInfos } from '../../api/user-info/getUserInfos';
import { UserInfo } from '../../api/user-info/types';
import { useLocalStorage } from '@uidotdev/usehooks';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import {
  ChartMonth,
  parseUserInfoToChartMonth,
} from '../manager/statistic-resident/util/resident-parser';

import {
  Groups2,
  NotificationsActive,
  Security,
  ManageAccounts,
  LocationCity,
  Home,
  AdminPanelSettings,
} from '@mui/icons-material';
import TempNotificationTable from '../../features/notification/TempNotificationTable';

export default function StaffDashboard() {
  const navigate = useNavigate();

  const theme = useTheme();

  const [user, setUser] = useLocalStorage<User>('user');
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const [chartData, setChartData] = useState<ChartMonth[]>([]);
  const [selectedData, setSelectedData] = useState<ChartMonth>();

  const chartColor = {
    join: '#557C55',
    leave: '#FF004D',
    total: theme.palette.primary.light,
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userInfos = await getUserInfos();

      setUserInfo(userInfos.find((userInfo) => userInfo.UserId === user.id));

      const data = parseUserInfoToChartMonth(userInfos);

      setChartData(data);
      setSelectedData(data[data.length - 1]);
    };

    fetchUser();
  }, []);

  if (chartData.length === 0) return null;

  return (
    <Box display='flex' flexDirection='column' padding={4} height='100vh' gap={4}>
      <Typography variant='h3' color='text'>
        Xin chào, {userInfo?.firstName}
      </Typography>

      <Divider />

      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                display='flex'
                flexDirection='column'
                alignContent='center'
                justifyContent='center'
                alignItems='center'
                gap={1}
              >
                <Groups2
                  sx={{
                    fontSize: 120,
                    color: '#4CAF50',
                  }}
                />
                <Typography variant='h4' color='text' fontWeight='bold'>
                  {selectedData?.months[selectedData?.months.length - 1].total}
                </Typography>
                <Typography variant='h5' color='text'>
                  Cư dân
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                display='flex'
                flexDirection='column'
                alignContent='center'
                justifyContent='center'
                alignItems='center'
                gap={1}
              >
                <LocationCity
                  sx={{
                    fontSize: 120,
                    color: '#1e4620',
                  }}
                />
                <Typography variant='h4' color='text' fontWeight='bold'>
                  3
                </Typography>
                <Typography variant='h5' color='text'>
                  Chung cư
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                display='flex'
                flexDirection='column'
                alignContent='center'
                justifyContent='center'
                alignItems='center'
                gap={1}
              >
                <Home
                  sx={{
                    fontSize: 120,
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography variant='h4' color='text' fontWeight='bold'>
                  75
                </Typography>
                <Typography variant='h5' color='text'>
                  Căn hộ
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                display='flex'
                flexDirection='column'
                alignContent='center'
                justifyContent='center'
                alignItems='center'
                gap={1}
              >
                <AdminPanelSettings
                  sx={{
                    fontSize: 120,
                    color: '#757575',
                  }}
                />
                <Typography variant='h4' color='text' fontWeight='bold'>
                  3
                </Typography>
                <Typography variant='h5' color='text'>
                  Quản trị
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box display='flex' height='100%' flexGrow={1} minHeight={0} gap={4} flexDirection='row'>
        <Paper
          sx={{
            width: '50%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <TempNotificationTable />
        </Paper>

        <Box display='flex' flexDirection='column' minHeight={0} flexGrow={1} gap={4} width='50%'>
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
      </Box>
    </Box>
  );
}
