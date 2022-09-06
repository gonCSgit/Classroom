import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import useInput from '../hooks/use-input';
import { User } from '../shared/interfaces';
import React from 'react';

export default function SignIn(props: {
  setRoleRoute: React.Dispatch<React.SetStateAction<User>>;
}) {
  const {
    value: emailField,
    isValid: enteredEmailIsValid,
    hasError: emailError,
    valueChangeHandler: emailFieldHandler,
    reset: resetEmailInput,
    inputBlurHandler: emailBlurHandler,
  } = useInput(
    (value: string) =>
      value.trim() !== '' &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) &&
      value.length >= 3 &&
      value.length <= 32,
  );

  const {
    value: passwordField,
    isValid: enteredPasswordIsValid,
    hasError: passwordError,
    valueChangeHandler: passwordFieldHandler,
    reset: resetPasswordInput,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(
    (value: string) => value !== '' && value.length >= 6 && value.length <= 32,
  );

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formIsValid = false;

    if (enteredEmailIsValid && enteredPasswordIsValid) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const request = await fetch(
      'https://classroom-backend-psi.vercel.app/auth/signin',
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(data)),
      },
    );
    const response = await JSON.parse(await request.text());
    console.log(response);

    // console.log(JSON.parse(response));
    if (request.ok) {
      props.setRoleRoute(response);
      navigate('/user');
    }
    resetPasswordInput();
    resetEmailInput();
  };

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
        <Typography variant="h5">Sign in</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            variant="standard"
            onChange={emailFieldHandler}
            onBlur={emailBlurHandler}
            value={emailField}
            error={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="standard"
            onChange={passwordFieldHandler}
            onBlur={passwordBlurHandler}
            value={passwordField}
            error={passwordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
