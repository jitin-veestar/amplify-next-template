"use client";
import Hero from "../components/landing-page/Hero";
import { Box, Container } from "@mui/material";
import Features from "../components/landing-page/Features";
import AppHeader from "../components/layout/AppHeader";
import AppFooter from "../components/layout/AppFooter";
import { useTranslations } from "next-intl";
import { Amplify, type ResourcesConfig } from "aws-amplify";
import { authConfig } from "../amplify-cognito-config";
// import outputs from '../../amplify_outputs.json';

Amplify.configure({
  Auth: authConfig,
},
{ ssr: true });

export default function Home() {
  const t = useTranslations("Index");


  return (
    <>
      <AppHeader />

      <Box
        component="main"
        sx={{
          width: "100%",
          minHeight: "100vh",
          zIndex: 10,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 10, sm: 16 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Hero />
          <Features />
        </Container>
      </Box>
      <AppFooter />
    </>
  );
}
