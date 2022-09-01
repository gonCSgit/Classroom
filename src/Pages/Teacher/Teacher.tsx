import { Box, Typography } from '@mui/material';

export default function Teacher() {
  return (
    <>
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography>You're using a teacher account</Typography>
      </Box>
    </>
  );
}
