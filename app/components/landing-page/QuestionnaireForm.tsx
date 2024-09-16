"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerForm } from "@/app/services/form-service";
import { toast } from "react-toastify";
import FormCheck from "../form/FormCheck";
import Box from "@mui/material/Box";

const schema = z.object({
  senderEmail: z.string().email(),
  receiverEmail: z.string().email(),
  message: z.string(),
  consent: z.boolean(),
  images: z.boolean(),
});
export default function QuestionnaireForm() {
  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      consent: false,
      images: false,
      message: "",
      receiverEmail: "",
      senderEmail: "",
    },
  });

  const values = watch();
  // console.log("valuesssss",{ values, errors});
  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: registerForm,
    onSuccess: (data) => {
      toast.success("Success");
      reset();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return (
    <form style={{ marginTop: 40, width: "100%" }} id="scrollQuestionnaire">
      <Stack
        direction={{ xs: "column" }}
        alignSelf="right"
        spacing={1}
        useFlexGap
        sx={{
          pt: 2,
          //   px: { xs: 4, sm: 16, md: 12 },
          width: { xs: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { sm: "100%" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary">
            Send a screening questionnaire via email
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 10 }}
          style={{ marginTop: 20 }}
        >
          <TextField
            id="outlined-basic"
            hiddenLabel
            size="medium"
            fullWidth
            variant="outlined"
            aria-label="Enter your email address"
            placeholder="Facility Email"
            error={!!errors.senderEmail}
            helperText={errors.senderEmail?.message as string}
            inputProps={{
              autoComplete: "off",
              "aria-label": "Enter your email address",
            }}
            {...register("senderEmail")}
          />
          <TextField
            id="outlined-basic"
            hiddenLabel
            fullWidth
            size="medium"
            variant="outlined"
            aria-label="Enter your email address"
            placeholder="Patient Email"
            error={!!errors.receiverEmail}
            helperText={errors.receiverEmail?.message as string}
            inputProps={{
              autoComplete: "off",
            }}
            {...register("receiverEmail")}
          />
        </Stack>
        <TextField
          id="outlined-basic"
          hiddenLabel
          size="medium"
          variant="outlined"
          aria-label="Message"
          placeholder="Message"
          error={!!errors.message}
          helperText={errors.message?.message as string}
          inputProps={{
            autoComplete: "off",
            "aria-label": "Enter your email address",
          }}
          {...register("message")}
          style={{ marginTop: 20 }}
        />
        <Stack
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
          marginLeft={{ xs: 1 }}
        >
          <div>
            <FormCheck
              name={`consent`}
              control={control}
              // rules={}
              label={"Send Anesthesia Consent Form"}
              // @ts-ignore
              error={""}
            />
          </div>
          {/* <ConcentDialog /> */}
          <div>
            <FormCheck
              name={`images`}
              control={control}
              // rules={}
              label={"Request Dental & Mallampati images"}
              // @ts-ignore
              error={""}
            />
          </div>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          sx={{ alignSelf: "flex-start", marginTop: 3, width: "10vw" }}
          disabled={isPending}
          onClick={handleSubmit(onSubmit as any)}
        >
          {isPending ? "Sending..." : "Send"}
        </Button>
      </Stack>
    </form>
  );
}
