import * as React from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useInput from '../hooks/use-input';

export default function SignUp() {
  const {
    value: fNameField,
    isValid: enteredFName,
    hasError: fNameError,
    valueChangeHandler: fNameFieldHandler,
    reset: resetFNameInput,
    inputBlurHandler: fNameBlurHandler,
  } = useInput(
    (value: string) =>
      value !== '' &&
      value.length >= 3 &&
      value.length <= 24 &&
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(value),
  );

  const {
    value: lNameField,
    isValid: enteredLName,
    hasError: lNameError,
    valueChangeHandler: lNameFieldHandler,
    reset: resetLNameInput,
    inputBlurHandler: lNameBlurHandler,
  } = useInput(
    (value: string) =>
      value !== '' &&
      value.length >= 3 &&
      value.length <= 24 &&
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(value),
  );

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formIsValid = false;

    if (
      enteredFName &&
      enteredLName &&
      enteredEmailIsValid &&
      enteredPasswordIsValid
    ) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const request = await fetch('http://localhost:3001/auth/signup', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(data)),
    });
    const response = await request.text();
    console.log(JSON.stringify(Object.fromEntries(data)));
    console.log(response);
    resetFNameInput();
    resetLNameInput();
    resetEmailInput();
    resetPasswordInput();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          bgcolor: '',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 5, textAlign: 'center' }}>
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            onChange={fNameFieldHandler}
            onBlur={fNameBlurHandler}
            value={fNameField}
            error={fNameError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            onChange={lNameFieldHandler}
            onBlur={lNameBlurHandler}
            value={lNameField}
            error={lNameError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
