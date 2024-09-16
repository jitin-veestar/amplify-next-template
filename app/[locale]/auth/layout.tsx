"use client";
// RootLayout.tsx
import useAuthUser from "@/app/hooks/useAuthUser";
import useNavigateWithLocale from "@/app/hooks/useNavigateLocale";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from "next/link";
import React, { useEffect } from "react";

interface AuthRootLayoutProps {
  children: React.ReactNode;
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        ASK Medical
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function AuthRootLayout({ children }: AuthRootLayoutProps) {
  const { user, loading } = useAuthUser();
  const navigateTo = useNavigateWithLocale();

  useEffect(() => {
    if (user && !loading) {
      console.log("auth layout");
      navigateTo("");
    }
  }, [user, loading]);

  return (
    <Stack sx={{ height: "100vh" }}>
      <Container component="main" maxWidth="sm">
        {children}
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Stack>
  );
}
