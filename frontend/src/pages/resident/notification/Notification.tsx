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

import NotificationTable from '../../../features/notification/NotificationTable';

export default function Notification() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display='flex' p={4} flexDirection='column' gap={4} height='100vh'>
      <Typography variant='h3' color='text'>
        Thông báo
      </Typography>

      <Divider />

      <NotificationTable />
    </Box>
  );
}
