"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "react-toastify";
import FormCheck from "../form/FormCheck";
import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import useAuthUser from "@/app/hooks/useAuthUser";
import useNavigateWithLocale from "@/app/hooks/useNavigateLocale";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  senderEmail: z.string().email(),
  receiverEmail: z.string().email(),
  message: z.string(),
  consent: z.boolean(),
  images: z.boolean(),
});

const scrollToSection = (id: any) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Hero() {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      consent: false,
      images: false,
      message: "",
      firstName: "",
      lastName: "",
      receiverEmail: "",
      senderEmail: "",
    },
  });
  const t = useTranslations("Index");
  const {user} = useAuthUser()
  const navigateTo = useNavigateWithLocale()

  

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
  const checkUserId = async () => {
    if (user) {
      try {
        const userId = user?.userId;
        const response = await axios.get(`/api/hippa-contract/${userId}`);
        if (
          response?.data?.message === "No Record found"
        ) {
          navigateTo("/hippa-contract");
        } else {
          console.log("ID present");
        }
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    } else {
      console.log("No user found");
    }
  };

  React.useLayoutEffect(() => {
    checkUserId();
  }, [user]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit as any)} style={{ width: "100%" }}>
      <Stack
        spacing={2}
        useFlexGap
        sx={{
          px: 2,
          display: "flex",
          width: { xs: "100%", md: "100%" },
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            fontWeight={800}
            sx={{ width: { sm: "100%", md: "80%" } }}
            fontSize={22}
          >
            {t("heroTitle")}
          </Typography>
        </div>

        <Typography
          component="span"
          variant="h6"
          fontSize={21}
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "primary.main" : "primary.light",
          }}
        >
          {t("heroSubTitleUnlimited")} <s>{t("heroSubTitleDollar")}</s>{" "}
          {t("heroSubTitleFree")}
        </Typography>
      </Stack>
      <Stack
        direction={{ xs: "column" }}
        alignSelf="right"
        spacing={1}
        useFlexGap
        sx={{
          pt: { xs: 0, sm: 2 },
          // width: { xs: "100%" },
          width: "100%",
        }}
      >
        {/* <Stack
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
            // aria-label="Enter your first name"
            placeholder={t("heroFirstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message as string}
            inputProps={{
              autoComplete: "off",
            }}
            // type="email"
            {...register("firstName")}
          />
          <TextField
            id="outlined-basic"
            hiddenLabel
            fullWidth
            size="medium"
            variant="outlined"
            // aria-label="Enter your Last Name"
            placeholder={t("heroLastName")}
            error={!!errors.lastName}
            // type="email"
            helperText={errors.lastName?.message as string}
            inputProps={{
              autoComplete: "off",
            }}
            {...register("lastName")}
          />
        </Stack> */}
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
            placeholder={t("heroFacilityEmail")}
            error={!!errors.senderEmail}
            helperText={errors.senderEmail?.message as string}
            inputProps={{
              autoComplete: "off",
              "aria-label": "Enter your email address",
            }}
            type="email"
            {...register("senderEmail")}
          />
          <TextField
            id="outlined-basic"
            hiddenLabel
            fullWidth
            size="medium"
            variant="outlined"
            aria-label="Enter your email address"
            placeholder={t("heroPatientEmail")}
            error={!!errors.receiverEmail}
            type="email"
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
          placeholder={t("heroMessage")}
          error={!!errors.consent}
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
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <FormCheck
              name={`consent`}
              control={control}
              label={t("heroCheckBox1")}
              // error={""}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <FormCheck
              name={`images`}
              control={control}
              label={t("heroCheckBox2")}
              // error={""}
            />
          </div>
        </Stack>
        {/* <Button
          variant="contained"
          color="primary"
          sx={{ alignSelf: "flex-start", marginTop: 3, width: "10vw" }}
          disabled={isPending}
          type="submit"
          onClick={() => {
            user ? handleSubmit(onSubmit as any) : "/api/auth/login";
          }}
        >
          {isPending ? t("heroSendingButton") : t("heroSendButton")}
        </Button> */}
        <Button
          variant="contained"
          color="primary"
          sx={{ alignSelf: "flex-start", marginTop: 3, width: "10vw" }}
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress size={20} style={{ color: "white" }} />
          ) : (
            t("heroSendButton")
          )}
        </Button>
      </Stack>
    </form>
  );
}
