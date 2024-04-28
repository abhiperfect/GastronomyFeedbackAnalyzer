import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ProfilePhoto({name}) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt={name}
        src="/static/images/avatar/1.jpg"
        sx={{ width: 85, height: 85 }}
      />
    </Stack>
  );
}
