import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const request = await fetch('http://localhost:3001/auth/signout', {
      method: 'POST',
    });
    navigate('/');
    return request;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              color="inherit"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Classroom
            </Typography>
            <Button
              color="inherit"
              onClick={logoutHandler}
              component={RouterLink}
              to="/"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}
