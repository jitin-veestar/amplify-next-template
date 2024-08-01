"use client";
import * as React from "react";
import {
  Divider,
  FormControl,
  IconButton,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import HeaderContainerWrapper from "./HeaderContainerWrapper";
import AppLogo from "./AppLogo";
import { ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import Button from "@mui/material/Button";
import LogoutForm from "./LogoutForm";
import useAuthUser from "@/app/hooks/useAuthUser";


const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

// Array of languages
const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "zh", label: "Mandarin" },
  { code: "vi", label: "Vietnamese" },
];

function AppAppBar() {
  const [language, setLanguage] = React.useState<string>("en");
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const {user} = useAuthUser()

  // const { user, error, isLoading } = useUser();
  // const currentUser = UserPool.getCurrentUser();



  useEffect(() => {
    const path = window.location.pathname;
    setLanguage(path.substring(1));
  }, []);



  const handleLanguageChange = (e: ChangeEvent<{ value: unknown }>) => {
    const nextLocale = e.target.value as string;
    setLanguage(nextLocale);
    router.replace(`/${nextLocale}`);
    console.log(e.target.value);
  };

  return (
    <HeaderContainerWrapper>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          ml: "-18px",
          px: 0,
        }}
      >
        <AppLogo />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            ml: { xs: "0px", md: "auto" },
          }}
        ></Box>
      </Box>
      {/* <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 0.5,
          alignItems: "center",
        }}
      ></Box> */}
      <Box sx={{mx:1}}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            // id="demo-simple-select"
            value={language}
            variant="standard"
            sx={{padding: 1, minWidth: '100px'}}
            placeholder="Choose Language"
            onChange={handleLanguageChange as any}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* <LanguageTranslator  /> */}

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 0.5,
          alignItems: "center",
        }}
      >
         {!user && (
          <>
            <Button
              color="primary"
              variant="text"
              size="small"
              component={Link}
              href="/auth/sign-in"
            >
              Sign in
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              component={Link}
              href="/auth/sign-up"
            >
              Sign up
            </Button>
          </>
         )}

        {user && (
          <LogoutForm />
        )}
      </Box>
    </HeaderContainerWrapper>
  );
}

export default AppAppBar;
