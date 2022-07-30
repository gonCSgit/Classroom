import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import { useContext } from "react";

export default function SignIn() {
  const auth = useContext(AuthContext);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request = await fetch("http://localhost:3001", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(Object.fromEntries(data)),
    });
    const response = await request.text();
    auth.access_key = response;
    console.log(auth.access_key);
    auth.login();
  };

  if (auth.isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Link component={RouterLink} to="/newuser" variant="body2">
            Want to create a Teacher account?
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
