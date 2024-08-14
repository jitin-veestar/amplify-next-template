'use client'
import * as React from 'react'
import Link from 'next/link'
import AppLogo from '@/app/components/layout/AppLogo'
import { handleSignIn } from '@/app/lib/cognitoActions'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
} from '@mui/material'

import useNavigateWithLocale from '@/app/hooks/useNavigateLocale'
import { Amplify } from 'aws-amplify'
import { authConfig } from '@/app/amplify-cognito-config'
import output from '../../../../amplify_outputs.json'

Amplify.configure(output);

export default function SignIn() {
  const navigateTo = useNavigateWithLocale()

  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const { success, message, redirectLink } = await handleSignIn('', data)
    if (success && redirectLink) {
      navigateTo('')
    } else if (!success && redirectLink) {
      toast.info(message)
      navigateTo(redirectLink)
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
        Sign in
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
            // onBlur={handleButtonClick}
            defaultValue={email || ''}
            autoComplete="email"
            autoFocus
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                style={{ color: '#551A8B' }}
                // onClick={handleButtonClick}
                href="/auth/send-verification-code"
              >
                {'Forgot password?'}
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
