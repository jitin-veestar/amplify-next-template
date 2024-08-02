'use client'
import * as React from 'react'
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
} from '@mui/material'
// import TextField from "@mui/material/TextField";
import Link from 'next/link'
import AppLogo from '@/app/components/layout/AppLogo'
import { handleConfirmResetPassword } from '@/app/lib/cognitoActions'
import { toast } from 'react-toastify'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useNavigateWithLocale from '@/app/hooks/useNavigateLocale'

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const [showPassword, togglePassword] = React.useState<boolean>(false)
  const navigateTo = useNavigateWithLocale()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const { success, message } = await handleConfirmResetPassword({
      username: String(data.get('email')),
      confirmationCode: String(data.get('confirmationCode')),
      newPassword: String(data.get('newPassword')),
    })
    if (success) {
      navigateTo('/auth/sign-in')
    } else if (!success) {
      toast.info(message)
    } else {
      toast.error(message)
    }
  }

  return (
    <Card
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '1px 1px 1px #eee',
        padding: 4,
      }}
    >
      <CardHeader avatar={<AppLogo />} />
      <Typography component="h1" variant="h3">
        Reset Password
      </Typography>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmationCode"
            label="Confirmation Code"
            type="number"
            id="confirmationCode"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => togglePassword((show) => !show)}>
                  <InputAdornment position="end">
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                </IconButton>
              ),
            }}
            type={showPassword ? 'password' : 'text'}
            name="newPassword"
            label="New Password"
            id="newPassword"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Set New Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link style={{ color: '#551A8B' }} href="/auth/sign-in">
                {'Sign in'}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/sign-up">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}
