import {
  Grid,
  TextField,
  FormControl,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { FormBoxWrapper } from "../CustomFormWrapper";
import Heading from "@/app/components/Heading";
import { useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { parseISO } from "date-fns";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";

const CustomInput = forwardRef((props, ref) => {
  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      label="Birth Date"
      autoComplete="off"
    />
  );
});
CustomInput.displayName = "CustomInput";
interface BasicSurgicalDetailsProps {
  setIsDown: (value: boolean) => void;
}

const BasicSurgicalDetails: React.FC<BasicSurgicalDetailsProps> = ({
  setIsDown,
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  }: any = useFormContext();

  const values = watch();
  const t = useTranslations("Index");
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
  });

  const handleDateChange = (date: Date | null) => {
    setValue("patient_information.dob", date?.toISOString());
  };

  useEffect(() => {
    if (inView) {
      setIsDown(true);
    }
  }, [inView]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormBoxWrapper sx={{ height: "75vh", overflowY: "auto" }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Heading label={t("patientInfoHeader")} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                label={t("patientInfoName")}
                type="text"
                fullWidth
                {...register("patient_information.patient_name")}
                error={!!errors?.patient_information?.patient_name}
                helperText={
                  errors?.patient_information?.patient_name?.message as any
                }
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                {console.log({
                  date: parseISO(values?.patient_information?.["dob"] ?? ""),
                })}
                <DatePicker
                  value={
                    values?.patient_information?.["dob"]
                      ? parseISO(values?.patient_information?.["dob"])
                      : null
                  }
                  label={t("patientInfoBirthDate")}
                  // disableOpenPicker
                  onAccept={handleDateChange}
                  disableFuture
                />
                {errors?.patient_information?.dob && (
                  <p className="error-message">Please select a date</p>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <TextField
                  select
                  required
                  label={t("patientInfoGender")}
                  value={values["gender"]}
                  {...register("patient_information.gender")}
                  error={!!errors?.patient_information?.gender}
                  helperText={
                    errors?.patient_information?.gender?.message as any
                  }
                >
                  <MenuItem value="male">{t("patientInfoMale")}</MenuItem>
                  <MenuItem value="female">{t("patientInfoFemale")}</MenuItem>
                  <MenuItem value="intersex">
                    {t("patientInfoIntersex")}
                  </MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                label={t("patientInfoHeightFeet")}
                fullWidth
                type="number"
                required
                inputProps={{ min: 0 }}
                InputProps={{
                  sx: {
                    min: 0,
                    "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input": {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
                {...register("patient_information.height_feet")}
                error={!!errors?.patient_information?.height_feet}
                helperText={
                  errors?.patient_information?.height_feet?.message as any
                }
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                label={t("patientInfoHeightInches")}
                fullWidth
                required
                type="number"
                inputProps={{ min: 0, max: 12 }}
                InputProps={{
                  sx: {
                    min: 0,
                    "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input": {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
                {...register("patient_information.height_inches", {
                  min: { value: 1, message: "Height must be at least 1 foot" },
                  max: { value: 12, message: "Height cannot exceed 12 feet" },
                })}
                error={!!errors?.patient_information?.height_inches}
                helperText={
                  errors?.patient_information?.height_inches?.message as any
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label={t("patientInfoWeight")}
                type="number"
                fullWidth
                required
                InputProps={{
                  sx: {
                    min: 0,
                    "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input": {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
                {...register("patient_information.weight")}
                error={!!errors?.patient_information?.weight}
                helperText={errors?.patient_information?.weight?.message as any}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                label={t("patientInfoPrimaryCareName")}
                type="text"
                fullWidth
                {...register("patient_information.name_of_primary_care")}
                error={!!errors?.patient_information?.name_of_primary_care}
                helperText={
                  errors?.patient_information?.name_of_primary_care
                    ?.message as any
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t("patientInfoPrimaryCareNumber")}
                type="number"
                InputProps={{
                  sx: {
                    min: 0,
                    "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input": {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
                fullWidth
                {...register("patient_information.primary_care_phone_number")}
                error={!!errors?.patient_information?.primary_care_phone_number}
                helperText={
                  errors?.patient_information?.primary_care_phone_number
                    ?.message as any
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label={t("patientInfoCardiologistName")}
                type="text"
                fullWidth
                {...register("patient_information.name_of_cardiologist")}
                error={!!errors?.patient_information?.name_of_cardiologist}
                helperText={
                  errors?.patient_information?.name_of_cardiologist
                    ?.message as any
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t("patientInfoCardiologistNumber")}
                type="number"
                InputProps={{
                  sx: {
                    min: 0,
                    "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "& input": {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
                fullWidth
                {...register("patient_information.cardiologist_phone_number")}
                error={!!errors?.patient_information?.cardiologist_phone_number}
                helperText={
                  errors?.patient_information?.cardiologist_phone_number
                    ?.message as any
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                label={t("patientInfoDoctorName")}
                type="text"
                fullWidth
                {...register("patient_information.name_of_doctor")}
                error={!!errors?.patient_information?.name_of_doctor}
                helperText={
                  errors?.patient_information?.name_of_doctor?.message as any
                }
              />
            </Grid>
            <div ref={inViewRef} />

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                minRows={2}
                label={t("patientInfoSurgicalProcedure")}
                placeholder={t("patientInfoSurgicalProcedurePlaceholder")}
                {...register("patient_information.surgical_procedure")}
                error={!!errors?.patient_information?.surgical_procedure}
                helperText={
                  errors?.patient_information?.surgical_procedure
                    ?.message as any
                }
                sx={{
                  "& .MuiOutlinedInput-root": { alignItems: "baseline" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </FormBoxWrapper>
      </Grid>
    </Grid>
  );
};

export default BasicSurgicalDetails;
