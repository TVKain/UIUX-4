import {
  Box,
  Button,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NotificationTable from '../../features/notification/NotificationTable';

import NotificationAddForm from '../../features/notification/NotificationAdd';

export default function NotificationAdd() {
  const navigate = useNavigate();

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Tạo thông báo
      </Typography>

      <Divider />

      <NotificationAddForm />
    </Box>
  );
}
