'use client'
import * as React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import KeyIcon from '@mui/icons-material/VpnKey'
import ExclamationCircleIcon from '@mui/icons-material/ErrorOutline'
import { handleConfirmSignUp } from '@/app/lib/cognitoActions'
import SendVerificationCode from '@/app/components/SendVerificationCode'
import { useParams, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function ConfirmSignUpForm() {
  const router = useRouter()
  const routeParams = useParams()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    watch,
  } = useForm({
    defaultValues: {
      apiError: '',
      email: email || '',
      code: '',
    },
  })

  const navigateToLogin = (email: string) => {
    router.push(
      `/${routeParams?.locale || 'en'}/auth/sign-in?email=${encodeURIComponent(
        email,
      )}`,
    )
  }
  const formEmail = watch('email')
  const onSubmit = async (data: any) => {
    clearErrors()
    try {
      const { success, message } = await handleConfirmSignUp('', data)
      if (!success) {
        if (message.includes('Current status is CONFIRMED')) {
          toast.info('User is Already Confirmed. Please login')
          navigateToLogin(data.email)
          return
        }
        setError('apiError', {
          type: 'manual',
          message: message,
        })
      } else {
        toast.success('User is Confirmed. Please login')
        navigateToLogin(data.email)
      }
    } catch (error) {
      setError('apiError', { message: error.message })
    }
  }
  console.log({ errors })

  return (
    <Card sx={{ mt: 8, p: 4, boxShadow: '1px 1px 1px #eee' }}>
      <CardHeader
        title={
          <Typography variant="h4">Please confirm your account</Typography>
        }
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                disabled={Boolean(email)}
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name="code"
            control={control}
            defaultValue=""
            rules={{ required: 'Code is required', minLength: 6 }}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(val) => {
                  field.onChange(val)
                  clearErrors()
                }}
                margin="normal"
                required
                fullWidth
                id="code"
                label="Code"
                type="text"
                inputProps={{ minLength: 6 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.code}
                helperText={
                  errors.code ? 'Code must be at least 6 characters' : ''
                }
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Confirm
          </Button>
          {errors.apiError && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <ExclamationCircleIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="body2" color="error">
                {errors.apiError.message}
              </Typography>
            </Box>
          )}
          {(email || formEmail) && (
            <SendVerificationCode email={email || formEmail} />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

// function ConfirmButton({pending}: {pending:boolean}) {

//   return (
//     <Button
//       type="submit"
//       fullWidth
//       variant="contained"
//       sx={{ mt: 3, mb: 2 }}
//       disabled={pending}
//     //   endIcon={<ArrowRightIcon />}
//     >
//       Confirm
//     </Button>
//   );
// }
