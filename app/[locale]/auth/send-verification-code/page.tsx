'use client'
import * as React from 'react'
import Link from 'next/link'
import AppLogo from '@/app/components/layout/AppLogo'
import { handleResetPassword } from '@/app/lib/cognitoActions'
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
} from '@mui/material'
import { toast } from 'react-toastify'
import useNavigateWithLocale from '@/app/hooks/useNavigateLocale'

// TODO remove, this demo shouldn't need to reset the theme.

export default function SendVerificationCode() {
  const navigateTo = useNavigateWithLocale()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const { success, message } = await handleResetPassword({
      email: String(data.get('email')),
    })
    if (success) {
      navigateTo('/auth/forgot-password')
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
        Forgot Password
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
            // defaultValue={email || ""}
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Verification Code
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
