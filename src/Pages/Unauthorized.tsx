import { Box, Container, CssBaseline, Typography } from '@mui/material';

export default function Unauthorized() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            marginBottom: 10,
          }}
        >
          <Typography variant="h2" component="h1">
            Classroom
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
