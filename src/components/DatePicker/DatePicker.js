import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function BasicDateRangePicker() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField autoComplete='off' size='small' {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField autoComplete='off' size='small' {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
