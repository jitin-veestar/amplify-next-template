'use client'

import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Tooltip,
  DialogTitle,
} from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout'
import { handleSignOut } from '@/app/lib/cognitoActions'
import { useState } from 'react'
import { toast } from "react-toastify";
import useNavigateWithLocale from '@/app/hooks/useNavigateLocale'

export default function LogoutForm() {
  const [open, toggleDialog] = useState(false)
  const handleClose = () => toggleDialog(false)
  const navigateTo = useNavigateWithLocale()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toggleDialog(true)
    // handleSignOut();
  }
  const handlePressCancel = async () => {
    toggleDialog(false)
    const { success, message } = await handleSignOut(false)
    if (success) {
      navigateTo('/auth/sign-in');
      toast.info(message);
    }
  }
  const handleAgree = async () => {
    toggleDialog(false)
    const { success, message } = await handleSignOut(true)
    if (success) {
      toast.info(message);
      navigateTo('/auth/sign-in')
    }
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to sign out from all devices.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePressCancel}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <form onSubmit={handleSubmit}>
          <button className="flex flex-row h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            {/* <PowerIcon className="w-6" /> */}
            <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
            <Tooltip title="Logout">
              <IconButton
                type="submit"
                sx={{ fontSize: '2rem', color: 'black' }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <div className="hidden md:block">Sign Out</div>
        </Box>
          </button>
      </form>
    </>
  )
}
