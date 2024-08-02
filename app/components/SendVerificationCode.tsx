
import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowForward";
import { handleSendEmailVerificationCode } from "../lib/cognitoActions";
import { toast } from "react-toastify";

export default function SendVerificationCode({email}: {email: string}) {
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    try {
      const {success, message} = await handleSendEmailVerificationCode({email});
      if (success){
        toast.success(message);
      }else{
        toast.error(message)
      }
      setLoading(false)
    } catch (error:any) {
      toast.error(error?.message)
      setLoading(false)
    }
  };

  return (
    <>
      <Box >
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={() => onSubmit()}
          disabled={loading}
          endIcon={<ArrowRightIcon />}
        >
          Resend Verification Code
        </Button>
      </Box>
      {/* <Box sx={{ display: "flex", alignItems: "center", mt: 2, height: 32 }}>
        {errors.errorMessage && (
          <>
            <ExclamationCircleIcon color="error" sx={{ mr: 1 }} />
            <Typography variant="body2" color="error">
              {errors.errorMessage.message}
            </Typography>
          </>
        )}
        {errors.message && (
          <Typography variant="body2" color="success">
            {errors?.message}
          </Typography>
        )}
      </Box> */}
    </>
  );
}
