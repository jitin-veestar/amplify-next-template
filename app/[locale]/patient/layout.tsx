"use client";
import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import StepperHeader from "./component/StepperHeader";

function PatientFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Disable scrolling when the component mounts
    // document.body.style.overflow = "hidden";
    // Re-enable scrolling when the component unmounts
    // return () => {
    //   document.body.style.overflow = "";
    // };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Some browsers require a return value for the dialog to appear
      return "You have unsaved changes. Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <StepperHeader />
      <Box
        component="main"
        sx={{
          width: "100%",
          zIndex: 10,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 7, sm: 10 },
            pb: { xs: 6, sm: 8 },
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
}

export default PatientFormLayout;
