import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Paper,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NotificationFull } from '../../api/notification/types';

import { getAllNotifications } from '../../api/notification/getAllNotifications';

import getDateDifference from './dateDifference';

export default function TempNotificationTable() {
  const [notifications, setNotifications] = useState<NotificationFull[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<NotificationFull>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getNotifications() {
      const res = await getAllNotifications();

      // Sort by createdAt
      res.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setNotifications(res);
      setSelectedNotification(res[0]);
    }

    getNotifications();
  }, []);

  const handleNotificationClick = (notification: NotificationFull) => {
    setSelectedNotification(notification);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (notifications.length === 0) return null;

  return (
    <>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        {notifications.map((notification) => (
          <ListItemButton
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
          >
            <ListItemAvatar>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
            </ListItemAvatar>

            <ListItemText
              sx={{
                whiteSpace: 'pre-line',
                textOverflow: 'ellipsis',
              }}
              primary={`${notification.title}`}
              primaryTypographyProps={{
                variant: 'body1',
                fontWeight: 'bold',
                noWrap: true,
              }}
              secondary={`${getDateDifference(notification.createdAt)} trước`}
            />
          </ListItemButton>
        ))}
      </List>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          width: '100%',
        }}
      >
        <DialogTitle>
          <Typography variant='h4' fontWeight='bold'>
            {selectedNotification?.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display='flex' flexDirection='column' gap={6}>
            <Grid container>
              <Grid item xs={3}>
                <Typography variant='h6'>Nội dung</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant='h6'
                  sx={{
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                  }}
                >
                  {selectedNotification?.content}
                </Typography>
              </Grid>
            </Grid>

            <Box display='flex' flexDirection='column' gap={1}>
              <Grid container>
                <Grid item xs={3}>
                  Đăng bởi
                </Grid>
                <Grid item xs={9}>
                  <Typography>{selectedNotification?.User.username}</Typography>
                </Grid>
                <Grid item xs={3}>
                  Thời gian đăng
                </Grid>
                <Grid item xs={9}>
                  {`${new Date(
                    selectedNotification!.createdAt,
                  ).toLocaleString()} (${getDateDifference(
                    selectedNotification!.createdAt,
                  )} trước)`}
                </Grid>
              </Grid>

              <Typography variant='body2' color='text.secondary'></Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
