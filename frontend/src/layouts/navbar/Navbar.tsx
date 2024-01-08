import { Logout } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
  Divider,
  ListItemIcon,
  useTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import * as React from 'react';

import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from '@uidotdev/usehooks';

import { LoginResponse } from '../../api/user/login';

const roles: Record<string, string> = {
  staff: 'Quản lý',
  resident: 'Cư dân',
  manager: 'Quản trị',
  police: 'Cảnh sát',
};

type NavbarProps = {
  base: string;
  items: { name: string; route: string }[];
};

export default function Navbar({ base, items }: NavbarProps) {
  const location = useLocation();
  const theme = useTheme();

  const navigate = useNavigate();

  const [user] = useLocalStorage<LoginResponse>('user', undefined);

  const [logoutOpen, setLogoutOpen] = React.useState(false);

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' p={4} gap={4} height='100%'>
      <Box display='flex' justifyContent='center' gap={1} alignItems='center'>
        <Box component='img' sx={{ height: '100%', width: '25%' }} src='/src/assets/logo.svg' />
        <Typography variant='h5' color='primary' fontWeight='600'>
          Myhome
        </Typography>
      </Box>

      <FormControl variant='standard' size='medium'>
        <InputLabel>Vai trò</InputLabel>
        <Select
          labelId='role-select'
          id='role-select'
          label='Vai trò'
          variant='standard'
          value={base}
        >
          {user.Roles.map((role) => (
            <MenuItem
              key={role.name}
              value={role.name}
              onClick={() => {
                if (base !== role.name) {
                  navigate(`/${role.name}`);
                }
              }}
            >
              {roles[role.name]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display='flex' flexDirection='column' gap={4}>
        {items.map((item) => (
          <Button
            style={{
              justifyContent: 'flex-start',
              color:
                location.pathname.includes(base) && location.pathname.includes(item.route)
                  ? theme.palette.secondary.main
                  : theme.palette.text.primary,
              fontSize: '1.2rem',
              textTransform: 'capitalize',
            }}
            size='large'
            key={item.route}
            onClick={() => {
              navigate(`/${base}/${item.route}`);
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>

      <Divider />

      <Button
        sx={{ marginTop: 'auto' }}
        variant='contained'
        startIcon={<Logout />}
        onClick={() => {
          setLogoutOpen(true);
        }}
      >
        Đăng xuất
      </Button>
      <Dialog
        open={logoutOpen}
        maxWidth='xs'
        fullWidth
        aria-labelledby='logout-dialog-title'
        aria-describedby='logout-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Đăng xuất'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Bạn có muốn đăng xuất không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setLogoutOpen(false);
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              setLogoutOpen(false);
              navigate('/login');
            }}
            autoFocus
            variant='contained'
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
