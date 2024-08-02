"use client";

import * as React from "react";
import ExclamationCircleIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";
import AppLogo from "@/app/components/layout/AppLogo";
import { Card, CardContent, CardHeader, Button, TextField, Grid, Box, Typography } from "@mui/material";
import { handleSignUp } from "@/app/lib/cognitoActions";
import { redirect, useParams, useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const routeParams = useParams();
  const [error, setError] = React.useState("")
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("")
    const data = new FormData(event.currentTarget);
    const errorMessage = await handleSignUp("", data);
    if (errorMessage) {
      setError(errorMessage)
      return;
    }
    const email = String(data.get("email"));
    navigateToConfirmSignup(email);
    
  };
  const navigateToConfirmSignup = (email: string) => {
    router.push(
      `/${
        routeParams?.locale || "en"
      }/auth/confirm-signup?email=${encodeURIComponent(email)}`
    ); 
  };

  return (
    <Card
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "1px 1px 1px #eee",
        padding: 4,
      }}
    >
      <CardHeader avatar={<AppLogo />} />
      <Typography component="h1" variant="h3">
        Sign up
      </Typography>
      <CardContent>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          {error && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <ExclamationCircleIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          )}
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
              <Link href="/auth/sign-in">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
