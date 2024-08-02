import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

const Success: React.FC = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // router.push("/");
    }
  }, [seconds, router]);

  return (
    <Card
      sx={{
        display: "grid",
        placeItems: "center",
        margin: 0,
        minHeight: { xs: "50vh", md: "40vh" },
        minWidth: { xs: "80vw", md: "50vw" },
        borderWidth: 4,
        animation: "appear 1s ease-out forwards",
        "@keyframes appear": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "@keyframes tick": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      }}
    >
      {seconds > 0 ? (
        <>
          <Typography
            variant="h1"
            sx={{
              fontSize: "6rem",
              color: "green",
              animation: "tick 2s ease-out forwards",
            }}
          >
            <CheckCircleOutline sx={{ fontSize: "inherit", color: "green" }} />
          </Typography>
          {/* <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              color: "blue",
              marginTop: "1rem",
            }}
          >
            Your form is submitting in {seconds} seconds...
          </Typography> */}
        </>
      ) : (
        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem",
            color: "blue",
            marginTop: "1rem",
            padding: 10,
            textAlign: "center",
          }}
        >
          Your form is submitted, please close the window
        </Typography>
      )}
    </Card>
  );
};

export default Success;
