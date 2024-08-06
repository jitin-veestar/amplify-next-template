"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import HippaDialog from "@/app/components/landing-page/HippaDialog";
import { useTranslations } from "next-intl";
import useAuthUser from "@/app/hooks/useAuthUser";
import { generateClient } from "aws-amplify/data";
import useNavigateWithLocale from "@/app/hooks/useNavigateLocale";
import { Amplify } from "aws-amplify";
import {Schema} from '@/amplify/data/resource';

const client = generateClient<Schema>();

interface IFormInput {
  userId: string;
  name: string;
  facilityEmail: string;
  city: string;
  country: string;
  facilityName: string;
  acceptHippa: boolean;
}

const HippaContract: React.FC = () => {
  const { user, loading: loadingUser } = useAuthUser();
  const navigateTo = useNavigateWithLocale();
  const [loading, setLoading] = useState(false);
  const [hippaContract, setHippaContract] = useState(false);
  const [showConcentDialog, setShowConcentDialog] = useState(false);
  const t = useTranslations("Index");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      userId: user?.userId || "default",
      name: "",
      facilityEmail: "",
      city: "",
      country: "",
      facilityName: "",
      acceptHippa: false,
    },
  });
  const router = useRouter();

  

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    console.log("ONsubmit::::::", user);
    console.log("final data", data);
    try {
      client.models.IndexForm.create({
        ...data
      });
      // const response = await axios.post("/api/hippa-contract", {
      //   ...data,
      //   userId: user?.userId,
      // });
      // console.log({response})

      navigateTo("");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!loadingUser && !user){
  //     navigateTo("/auth/sign-in")
  //   }
  // }, [user, loadingUser]);

  // if (loadingUser || !user) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "70vh",
  //       }}
  //     >
  //       <CircularProgress size={69} />
  //     </Box>
  //   );
  // }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
        maxWidth: "600px",
        margin: "auto",
        paddingTop: 10,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        fontSize={24}
        fontWeight={800}
        marginLeft={2}
        marginBottom={2}
      >
        {t("hippaContractFormTitle")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("hippaContractNameLabel")}
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? t("hippaContractNameRequired") : ""}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="facilityEmail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("hippaContractFacilityEmailLabel")}
                variant="outlined"
                error={!!errors.facilityEmail}
                helperText={
                  errors.facilityEmail
                    ? t("hippaContractFacilityEmailRequired")
                    : ""
                }
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("hippaContractCityLabel")}
                variant="outlined"
                error={!!errors.city}
                helperText={errors.city ? t("hippaContractCityRequired") : ""}
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("hippaContractCountryLabel")}
                variant="outlined"
                error={!!errors.country}
                helperText={
                  errors.country ? t("hippaContractCountryRequired") : ""
                }
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="facilityName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("hippaContractFacilityNameLabel")}
                variant="outlined"
                error={!!errors.facilityName}
                helperText={
                  errors.facilityName
                    ? t("hippaContractFacilityNameRequired")
                    : ""
                }
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12} marginLeft={1}>
          <Controller
            name="acceptHippa"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setHippaContract(e.target.checked);
                    }}
                  />
                }
                label={
                  <>
                    {t("hippaContractAcceptHippaLabel")}
                    <span
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => setShowConcentDialog(true)}
                    >
                      {t("hippaContractHippaContract")}
                    </span>
                  </>
                }
              />
            )}
            rules={{ required: true }}
          />
        </Grid>
        {errors.acceptHippa && (
          <Grid item xs={12}>
            <Typography color="error">
              {t("hippaContractAcceptHippaRequired")}
            </Typography>
          </Grid>
        )}
        <Grid item xs={3} marginLeft={1}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!hippaContract}
            fullWidth
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              t("hippaContractSubmitButton")
            )}
          </Button>
        </Grid>
      </Grid>
      {showConcentDialog && (
        <HippaDialog
          key="hippa-dialog" // Ensure a unique key
          open={showConcentDialog}
          setOpen={setShowConcentDialog}
          onSubmit={onSubmit}
        />
      )}
    </Box>
  );
};

export default HippaContract;
