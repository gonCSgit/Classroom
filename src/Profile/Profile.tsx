import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export default function Profile() {
  const auth = useContext(AuthContext);
  const logoutHandler = () => {
    auth.logout();
    auth.access_key = "";
  };

  return (
    <>
      <h1>Logged in!</h1>
      <Button action={logoutHandler}>Logout</Button>
    </>
  );
}
