import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import SettingSvg from './SettingSvg';
export default function UserSetting() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<SettingSvg />}>
        Settings
      </Button>
    </Stack>
  );
}
