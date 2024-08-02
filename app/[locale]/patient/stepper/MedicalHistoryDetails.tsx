import {
  Grid,
  TextField,
  FormControl,
  Typography,
  Card,
  MenuItem,
} from "@mui/material";
import React, { forwardRef, useRef, useEffect } from "react";
import { FormBoxWrapper } from "../component/CustomFormWrapper";
import Heading from "@/app/components/Heading";
import { useFormContext } from "react-hook-form";
import TableFormField from "@/app/components/form/FormTable";
import AllergyFormField from "@/app/components/form/AllergyTable";
import FormCheck from "@/app/components/form/FormCheck";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";

interface CustomInputProps {
  [key: string]: any;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
  }
);
CustomInput.displayName = "CustomInput";

interface MedicalHistoryDetailsProps {
  setIsDown: (value: boolean) => void;
}

const MedicalHistoryDetails: React.FC<MedicalHistoryDetailsProps> = ({
  setIsDown,
}) => {
  const {
    watch,
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const values = watch();
  const t = useTranslations("Index");
  const formBoxRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
  });

  const handleDateChange = (date: Date | null) => {
    setValue("medical_history.menstrual_date", date?.toISOString());
  };

  const handleScroll = () => {
    if (formBoxRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = formBoxRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("down");
        setIsDown(true);
      }
    }
  };

  useEffect(() => {
    const formBox = formBoxRef.current;
    if (formBox) {
      formBox.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (formBox) {
        formBox.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      setIsDown(true);
    }
  }, [inView]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormBoxWrapper
          sx={{ height: "75vh", overflowY: "auto" }}
          ref={formBoxRef}
        >
          <Grid container spacing={4} mb={4}>
            <Grid item xs={12}>
              <Heading label={t("medicalHistoryTitle")} />
            </Grid>

            {values?.patient_information?.gender === "female" && (
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                  <Typography>{t("medicalHistoryHysterectomy")}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <TextField
                      select
                      required
                      value={values["hysterectomy"]}
                      {...register("medical_history.hysterectomy")}
                    >
                      <MenuItem value="yes">{t("yes")}</MenuItem>
                      <MenuItem value="no">{t("no")}</MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
              </Grid>
            )}

            {values?.medical_history?.hysterectomy === "no" && (
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                  <Typography>{t("medicalHistoryMenstrual")}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <TextField
                      select
                      required
                      value={values["menstrual"]}
                      {...register("medical_history.menstrual")}
                    >
                      <MenuItem value="yes">{t("yes")}</MenuItem>
                      <MenuItem value="no">{t("no")}</MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
              </Grid>
            )}

            <Grid container item xs={12} spacing={2} direction={"row"}>
              <Grid item xs={12}>
                {t("medicalHistoryMetalImplant")}
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <TextField
                    select
                    value={values["metal_implant"]}
                    {...register("medical_history.metal_implant")}
                    defaultValue={"no"}
                  >
                    <MenuItem value="yes">{t("yes")}</MenuItem>
                    <MenuItem value="no">{t("no")}</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              {values?.medical_history?.metal_implant === "yes" && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("medicalHistoryMetalImplantSite")}
                    {...register("medical_history.metal_implant_site")}
                  />
                </Grid>
              )}
            </Grid>

            <Grid item xs={12}>
              <Card>
                <Typography
                  fontSize={16}
                  fontWeight={800}
                  color={"primary"}
                  sx={{ p: 2 }}
                >
                  {t("medicalHistorySurgeriesTitle")}
                </Typography>
                <TableFormField
                  formName="medical_history"
                  name="surgery_or_procedure"
                  columns={[
                    {
                      title: t("medicalHistorySurgeryOrProcedure"),
                      key: "surgeryOrProcedure",
                    },
                    { key: "date", title: t("medicalHistoryDate") },
                  ]}
                  sx={{ p: 0 }}
                />
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <Typography
                  fontSize={16}
                  fontWeight={800}
                  color={"primary"}
                  sx={{ p: 2, mb: 2 }}
                >
                  {t("medicalHistoryAllergiesTitle")}
                </Typography>
                <AllergyFormField
                  name="medical_history.allergies"
                  columns={[
                    {
                      title: t("medicalHistoryAllergiesMedications"),
                      key: "allergies",
                    },
                  ]}
                  sx={{ p: 0 }}
                />
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography sx={{ fontWeight: 800, fontSize: "28px" }}>
                      {t("medicalHistoryFamilyTitle")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Typography
                      fontSize={16}
                      fontWeight={800}
                      color={"primary"}
                      sx={{ p: 0 }}
                    >
                      {t("medicalHistoryFamilyProblems")}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    {[
                      {
                        label: t("medicalHistoryNoseBleeds"),
                        key: "nose_bleed",
                      },
                      {
                        label: t("medicalHistoryToothExtractions"),
                        key: "bleeding_with_tooth_extractions",
                      },
                      {
                        label: t("medicalHistorySurgeryBleeding"),
                        key: "bleeding_after_surgery",
                      },
                    ].map((item, index) => (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        mb={2}
                        sx={{
                          display: { xs: "grid", md: "flex" },
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <FormCheck
                          name={`medical_history.${item.key}`}
                          control={control}
                          label={item.label}
                          error={errors[item.key]}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Typography
                      fontSize={16}
                      fontWeight={800}
                      color={"primary"}
                      sx={{ p: 0 }}
                    >
                      {t("medicalHistoryAnesthesiaProblems")}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    {[
                      {
                        label: t("medicalHistoryNauseaVomiting"),
                        key: "sever_nausea_vomiting",
                      },
                      {
                        label: t("medicalHistoryHyperthermia"),
                        key: "malignant_hyperthermia",
                      },
                      {
                        label: t("medicalHistoryBreathingIssues"),
                        key: "breathing_difficulties",
                      },
                      {
                        label: t("medicalHistoryBreathingTubeIssues"),
                        key: "placement_of_breathing_tube",
                      },
                      {
                        label: t(
                          "medicalHistoryPseudocholinesteraseDeficiency"
                        ),
                        key: "pseudocholinesterase_deficiency",
                      },
                      {
                        label: t("medicalHistoryMotionSickness"),
                        key: "motion_sickness",
                      },
                    ].map((item, index) => (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        mb={2}
                        sx={{
                          display: { xs: "grid", md: "flex" },
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <FormCheck
                          name={`medical_history.${item.key}`}
                          control={control}
                          label={item.label}
                          error={errors[item.key]}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Typography
                      fontSize={16}
                      fontWeight={800}
                      color={"primary"}
                      sx={{ p: 0 }}
                    >
                      {t("medicalHistoryCurrentIssues")}
                    </Typography>
                  </Grid>

                  <div ref={inViewRef} />

                  <Grid item xs={12} md={12}>
                    {[
                      {
                        key: "chipped_or_loose_teeth",
                        label: t("medicalHistoryLooseTeeth"),
                      },
                      {
                        key: "problems_opening_mouth",
                        label: t("medicalHistoryMouthOpening"),
                      },
                      {
                        key: "problems_moving_neck",
                        label: t("medicalHistoryNeckMovement"),
                      },
                    ].map((item, index) => (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        mb={2}
                        sx={{
                          display: { xs: "grid", md: "flex" },
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <FormCheck
                          name={`medical_history.${item.key}`}
                          control={control}
                          label={item.label}
                          error={errors[item.key]}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </FormBoxWrapper>
      </Grid>
    </Grid>
  );
};

export default MedicalHistoryDetails;
